import { publish } from "../../simulator/Broker"
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
    }

    enter(): void {
        // console.log("enter iteration state")
    }

    exit(): void {
        // console.log("exit iteration state")
    }

    render(): void {
        // console.log("render iteration state")

    }

    update(): void {
        if (this.current_iteration < this.max_iterations) {
            publish(
                "Log",
                `Processing iteration ${this.current_iteration + 1} of ${this.max_iterations}`
            )
            push_state(new GeneratorsState())
        } else {
            pop_state()
        }
        this.current_iteration = this.current_iteration + 1
    }
}

export default IterationsState