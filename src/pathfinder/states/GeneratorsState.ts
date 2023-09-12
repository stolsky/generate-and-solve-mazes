import {
    pop as pop_state,
    push as push_state,
    type State
} from "../../simulator/classes/StateStack"
import random, { set_seed } from "../random/random"
import Cell from "../classes/Cell"
import Configuration from "../config/Configuration"
import { format_time } from "../../simulator/ui/components/utilities"
import type Generator from "../generators/Generator"
import { get_all as get_all_tasks } from "../../simulator/classes/TaskList"
import Grid from "../classes/Grid"
import GrowingTree from "../generators/GrowingTree"
import { publish } from "../../simulator/Broker"
import SolutionsState from "./SolutionsState"

class GeneratorsState implements State {

    // TODO test if these readonlies works
    private readonly seed: string
    private readonly generator: Generator
    private readonly cell_size: number
    private runtime: number

    constructor() {
        const width = Configuration.get_property_value("grid_width") as number
        const height = Configuration.get_property_value("grid_height") as number
        this.cell_size = Configuration.get_property_value("grid_cell_size") as number
        this.runtime = 0

        // check which generator is to be used
        this.generator = new GrowingTree(new Grid(width, height))
        
        // TODO refactor to method
        this.seed = Math.floor(random(0, Date.now())).toString(10)
        // initialize pseudo random number generator with seed
        set_seed(this.seed)
        publish("Log", `Seed ${this.seed}`)
        
        const start_position = this.generator.find_random_position()
        this.generator.set_start_position(start_position)
        publish("Log", `Start generating at ${start_position.x}:${start_position.y}`)

        // TODO better setting colors
        publish("Add_legend_item", `${Cell.Color.floor.label }:${Cell.Color.floor.color}`)
        publish("Add_legend_item", `${Cell.Color.start.label }:${Cell.Color.start.color}`)
        publish("Add_legend_item", `${Cell.Color.stored.label }:${Cell.Color.stored.color}`)
        publish("Add_legend_item", `${Cell.Color.wall.label }:${Cell.Color.wall.color}`)
        get_all_tasks().forEach((task) => {
            task.set_render_options({ colors: {
                floor: Cell.Color.floor.color,
                start: Cell.Color.start.color,
                stored: Cell.Color.stored.color,
                wall: Cell.Color.wall.color,
            }
        })})
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
        if (this.generator.is_finished()) {
            publish("Log", `Maze generated in ${format_time(this.runtime)}`)
            pop_state()
            push_state(new SolutionsState(this.generator.get_grid()))
        }
    }

    update(delta_time: number): void {
        this.generator.perform_step()
        this.runtime = this.runtime + delta_time
    }
}

export default GeneratorsState