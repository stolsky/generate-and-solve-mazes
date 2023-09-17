import {
    MAIN_TYPE,
    SUB_TYPE
} from "../types/CellType"
import {
    pop as pop_state,
    push as push_state,
    type State
} from "../../simulator/classes/StateStack"
import random,
    { set_seed } from "../random/random"
import type Cell from "../classes/Cell"
import Configuration from "../config/Configuration"
import create_generator from "../generators/GeneratorFactory"
import type Generator from "../generators/Generator"
// TODO refactor to avoid using TaskList from simulator
import { get_all as get_all_tasks } from "../../simulator/classes/TaskList"
import Grid from "../classes/Grid"
import { publish } from "../../simulator/Broker"
import SolutionsState from "./SolutionState"

class GeneratorsState implements State {

    private readonly seed: string
    private readonly generator: Generator
    private readonly cell_size: number
    private runtime: number

    // TODO necessary with clean_copy method
    private reset_generating_variables(): Cell[] {
        const updates: Cell[] = []
        this.generator.get_grid().each((cell) => {
            if (cell.type === MAIN_TYPE.START || cell.type === MAIN_TYPE.GOAL) {
                cell.type = MAIN_TYPE.FLOOR
            }
            cell.sub_type = SUB_TYPE.NONE
            cell.sub_type = SUB_TYPE.NONE
            updates.push(cell)
        })

        return updates
    }

    constructor(generator_id: number) {
        const width = Configuration.get_property_value("grid_width") as number
        const height = Configuration.get_property_value("grid_height") as number
        this.cell_size = Configuration.get_property_value("grid_cell_size") as number
        this.runtime = 0

        get_all_tasks().forEach((task) => { task.reset() })

        this.generator = create_generator(generator_id, new Grid(width, height))
        
        // TODO refactor to method
        this.seed = Math.floor(random(0, Date.now())).toString(10)
        // TODO DEVELOPMENT ONLY
        // this.seed = "739905356692"
        // initialize pseudo random number generator with seed
        set_seed(this.seed)
        publish("Log", `Seed ${this.seed}`)
        
        const start_position = this.generator.find_random_position()
        this.generator.set_start_position(start_position)
        publish("Log", `Start generating at ${start_position.x}:${start_position.y}`)
    }

    enter(): void {
        // console.log("enter generator state")
    }

    exit(): void {
        // console.log("exit generator state")
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