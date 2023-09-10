import Ticker from "./Ticker"
import Configuration from "./config/Configuration"
import { is_empty, render, update } from "./classes/StateStack"
import { update_runtime } from "./ui/components/controls/Controls"

let runtime: number = 0

let speed_multiplier: number = Configuration.get_property_value("speed_multiplier_default") as number
let speed_multiplier_max: number = Configuration.get_property_value("speed_multiplier_max") as number
let speed_multiplier_min: number = Configuration.get_property_value("speed_multiplier_min") as number

// TODO set ticker via setup/init
let ticker: Ticker = new Ticker()

let slow_down_counter: number = 0
const loop = (delta_time: number) => {

    const speed = speed_multiplier
    if (speed < 1 && slow_down_counter < 1 / speed) {
        slow_down_counter = slow_down_counter + 1
        return
    }

    const adjusted_delta_time = speed * delta_time
    runtime = runtime + adjusted_delta_time;
    update_runtime(runtime)

    for (let i = 0; i < speed; i = i + 1) {
        update(delta_time)
        render()
    }

    if (is_empty()) {
        stop()
    }

    // TODO refactor to avoid next line
    slow_down_counter = 0
}

const get_speed_multiplier = () => speed_multiplier

const set_speed_multiplier = (multiplier: number) => {
    if (multiplier >= speed_multiplier_min
        && multiplier <= speed_multiplier_max) {
        speed_multiplier = multiplier
    }
}

const start = () => ticker.start(loop)

const stop = () => ticker.stop()

export {
    get_speed_multiplier,
    set_speed_multiplier,
    start,
    stop
}