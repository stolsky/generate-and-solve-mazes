import Configuration from "../config/Configuration"

import { State, pop as pop_state, push as push_state } from "../../Simulator/classes/StateStack"
import { get_all as get_all_tasks } from "../../Simulator/classes/TaskList"
import { publish } from "../../Simulator/Broker"
import { format_time } from "../../Simulator/ui/components/utilities"

import Grid from "../classes/Grid"
import GrowingTree from "../generators/GrowingTree"
import Generator from "../generators/Generator"
import SolutionsState from "./SolutionsState"
import random, { set_seed } from "../random/random"

class GeneratorsState implements State {

    private seed: string = ""
    private generator: Generator = {} as Generator
    private cell_size: number = 0
    private runtime: number = 0

    enter() {
        const width = Configuration.get_property_value("grid_width") as number
        const height = Configuration.get_property_value("grid_height") as number
        this.cell_size = Configuration.get_property_value("grid_cell_size") as number

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

        get_all_tasks().forEach((task) => task.set_render_options({ colors: {
            floor: "#FFFFFF",
            start: "#FF0000",
            stored: "#88CCFF",
            wall: "#000000"
        }}))
    }

    exit() {
        // console.log("exit generator state")
    }

    render() {
        const updates = this.generator.get_updates()
        get_all_tasks().forEach((task) => task.render(
            updates,
            this.cell_size
        ))
        if (this.generator.is_finished()) {
            publish("Log", `Maze generated in ${format_time(this.runtime)}`)
            pop_state()
            push_state(new SolutionsState(this.generator.get_grid()))
        }
    }

    update(delta_time: number) {
        this.generator.perform_step()
        this.runtime = this.runtime + delta_time
        console.log(this.runtime)
    }
}

export default GeneratorsState