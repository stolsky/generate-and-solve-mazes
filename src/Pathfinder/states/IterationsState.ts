import Configuration from "../config/Configuration"
import GeneratorsState from "./GeneratorsState"

import { State, pop as pop_state, push as push_state } from "../../Simulator/classes/StateStack"

class IterationsState implements State {

    private current_iteration: number
    private max_iterations: number

    constructor() {
        this.current_iteration = 0
        this.max_iterations = Configuration.get_property_value("iterations") as number
    }

    enter() {
        // console.log("enter iteration state")
    }

    exit() {
        // console.log("exit iteration state")
    }

    render() {
        // console.log("render iteration state")
        // TODO output current iteration to info box only if current iteration changes
    }

    update() {
        // console.log("update iteration state")
        this.current_iteration = this.current_iteration + 1
        if (this.current_iteration < this.max_iterations) {
            push_state(new GeneratorsState())
        } else {
            pop_state()
        }
    }
}

export default IterationsState