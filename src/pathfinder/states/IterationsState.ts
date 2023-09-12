import {
    pop as pop_state,
    push as push_state,
    type State
} from "../../simulator/classes/StateStack"

import Configuration from "../config/Configuration"
import GeneratorsState from "./GeneratorsState"

class IterationsState implements State {

    private current_iteration: number
    private readonly max_iterations: number

    constructor() {
        this.current_iteration = 0
        this.max_iterations = Configuration.get_property_value("iterations") as number
        // TODO show 
    }

    enter(): void {
        // console.log("enter iteration state")
    }

    exit(): void {
        // console.log("exit iteration state")
    }

    render(): void {
        // console.log("render iteration state")
        // TODO output current iteration to info box only if current iteration changes

    }

    update(): void {
        if (this.current_iteration < this.max_iterations) {
            // TODO log or show number current iter and max iter in UI
            push_state(new GeneratorsState())
        } else {
            pop_state()
        }
        this.current_iteration = this.current_iteration + 1
    }
}

export default IterationsState