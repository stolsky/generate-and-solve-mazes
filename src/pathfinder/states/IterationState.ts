import {
    finalize_iteration,
    setup_iteration
} from "../../database/database"
import {
    pop as pop_state,
    push as push_state,
    type State
} from "../../loop/StateStack"
import Configuration from "../config/Configuration"
import GeneratorsState from "./GeneratorState"
import { publish } from "../../simulator/Broker"

class IterationsState implements State {

    private current_iteration: number
    private readonly max_iterations: number

    constructor() {
        this.current_iteration = 1
        this.max_iterations = Configuration.get_property_value("iterations") as number
    }

    enter(): void {
        setup_iteration(this.current_iteration)
    }

    exit(): void {
        finalize_iteration()
    }

    render(): void {
        // console.log("render iteration state")

    }

    update(): void {
        if (this.current_iteration <= this.max_iterations) {
            publish(
                "Log",
                `Processing iteration ${this.current_iteration} of ${this.max_iterations}`
            )
            push_state(new GeneratorsState(Configuration.get_property_value("generator_id") as number))
        } else {
            pop_state()
        }
        this.current_iteration = this.current_iteration + 1
    }
}

export default IterationsState