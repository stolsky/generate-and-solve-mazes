import {
    pop as pop_state,
    push as push_state,
    type State
} from "../../loop/StateStack"
import Configuration from "../config/Configuration"
import GeneratorsState from "./GeneratorState"
import { publish } from "../../simulator/Broker"
import { setup_iteration} from "../../database/database"

class IterationsState implements State {

    private current_iteration: number
    private readonly max_iterations: number

    constructor() {
        this.current_iteration = 1
        this.max_iterations = Configuration.get_property_value("iterations") as number
    }

    enter(): void { /* void */ }

    exit(): void { /* void */ }

    render(): void { /* void */ }

    update(): void {
        if (this.current_iteration <= this.max_iterations) {
            publish(
                "Log",
                `Processing iteration ${this.current_iteration} of ${this.max_iterations}`
            )
            setup_iteration(this.current_iteration)
            push_state(new GeneratorsState())
        } else {
            pop_state()
        }
        this.current_iteration = this.current_iteration + 1
    }
}

export default IterationsState