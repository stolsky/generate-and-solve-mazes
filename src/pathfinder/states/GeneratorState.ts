import {
    MAIN_TYPE,
    SUB_TYPE
} from "../types/CellType"
import {
    pop as pop_state,
    push as push_state,
    type State
} from "../../loop/StateStack"
import random,
    { set_seed } from "../random/random"
import type Cell from "../classes/Cell"
import Configuration from "../config/Configuration"
import create_generator from "../generators/GeneratorFactory"
import type Generator from "../generators/Generator"
// TODO refactor to avoid using TaskList from simulator
import { get_all as get_all_tasks } from "../../simulator/tasks/TaskList"
import Grid from "../classes/Grid"
import type Position from "../../global/Position"
import { publish } from "../../simulator/Broker"
import SolutionsState from "./SolutionState"
import { store_generation } from "../../database/database"

class GeneratorsState implements State {

    private readonly generator_id: number
    private readonly maze_type: number
    private readonly maze_width: number
    private readonly maze_height: number
    private readonly seed: string
    private readonly start_position: Position

    private readonly generator: Generator
    private readonly cell_size: number
    private runtime: number
    private count_floor_tiles: number

    private reset_generating_variables(): Cell[] {
        const updates: Cell[] = []
        this.generator.get_grid().each((cell) => {
            if (cell.type === MAIN_TYPE.START || cell.type === MAIN_TYPE.GOAL) {
                cell.type = MAIN_TYPE.FLOOR
            }
            cell.sub_type = SUB_TYPE.NONE
            cell.sub_type = SUB_TYPE.NONE
            updates.push(cell)
            if (cell.type === MAIN_TYPE.FLOOR) {
                this.count_floor_tiles = this.count_floor_tiles + 1
            }
        })

        return updates
    }

    constructor() {

        this.generator_id = Configuration.get_property_value("generator_id") as number
        this.maze_type = Configuration.get_property_value("maze_type") as number
        this.maze_width = Configuration.get_property_value("grid_width") as number
        this.maze_height = Configuration.get_property_value("grid_height") as number
        this.seed = Math.floor(random(0, Date.now())).toString(10)
        // initialize pseudo random number generator with seed
        set_seed(this.seed)

        this.generator = create_generator(this.generator_id, new Grid(this.maze_width, this.maze_height))
        this.start_position = this.generator.find_random_position()
        this.generator.set_start_position(this.start_position)

        this.cell_size = Configuration.get_property_value("grid_cell_size") as number
        this.runtime = 0
        this.count_floor_tiles = 0
    
        publish("Log", `Seed ${this.seed}`)
        publish("Log", `Start generating at ${this.start_position.x}:${this.start_position.y}`)
    }

    enter(): void {
        get_all_tasks().forEach((task) => { task.reset() })
    }

    exit(): void {
        store_generation({
            generator_id: this.generator.id,
            seed: this.seed,
            maze_width: this.maze_width,
            maze_height: this.maze_height,
            maze_type: this.maze_type,
            start_position: this.start_position,
            floor_tiles: this.count_floor_tiles
        })
    }

    render(): void {
        const updates = this.generator.get_updates()
        get_all_tasks().forEach((task) => {
            task.render(
                updates,
                this.cell_size
            )
        })
        // TODO move the following code -> nothing to do with rendering
        if (this.generator.is_finished()) {
            // TODO change information to Generated <i>perfect</i> maze / maze with ${n} circle/ dense obstacles, etc..
            publish("Log", `Maze generated in %t${this.runtime}`)
            const updates = this.reset_generating_variables()
            // TODO refactor
            get_all_tasks().forEach((task) => {
                task.render(
                    updates,
                    this.cell_size
                )
            })
            pop_state()
            push_state(new SolutionsState(this.generator.get_grid().clean_copy()))
        }
    }

    update(delta_time: number): void {
        this.runtime = this.runtime + delta_time
        this.generator.perform_step()
    }
}

export default GeneratorsState