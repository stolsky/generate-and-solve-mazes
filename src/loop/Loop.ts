import {
    is_empty as is_state_stack_empty,
    render,
    update
} from "./StateStack"
import {
    show_play_button,
    update_runtime
} from "../simulator/ui/components/controls/Controls"

import Tick, { type TickWrapper } from "./Tick"
import type Value from "../global/Value"

let runtime: number
let slow_down_counter: number

let speed_multiplier_max: number
let speed_multiplier_min: number
let speed_multiplier_std: number

let tick: TickWrapper

const loop = (delta_time: number): void => {
    if (is_state_stack_empty()) {
        stop()

        // TODO remove from loop => use broker?
        show_play_button()
    }

    const speed = speed_multiplier_std
    if (speed < 1 && slow_down_counter < 1 / speed) {
        slow_down_counter = slow_down_counter + 1
        return
    }

    const adjusted_delta_time = speed * delta_time
    runtime = runtime + adjusted_delta_time
    
    // TODO remove from loop
    // TODO use broker ??
    update_runtime(runtime)

    // TODO how to skip the rendering of an entire State
    for (let i = 0; i < speed; i = i + 1) {
        update(delta_time)
        render()
    }

    if (speed < 1) {
        slow_down_counter = 0
    }
}
    
export  const init = (speed_multiplier?: Value, ticker?: TickWrapper): void => {
    runtime = 0
    slow_down_counter = 0
    const { max, min, std } = speed_multiplier ?? { max: 1, min: 1, std: 1}
    speed_multiplier_max = max
    speed_multiplier_min = min
    speed_multiplier_std = std
    tick = ticker ?? new Tick() satisfies TickWrapper
}

export  const get_runtime = (): number => runtime

export const get_speed_multiplier = (): number => speed_multiplier_std

export const set_speed_multiplier = (multiplier: number): boolean => {
    if (multiplier >= speed_multiplier_min
        && multiplier <= speed_multiplier_max) {
        speed_multiplier_std = multiplier
        return true
    }
    return false
}

export const start = (): void => { tick.start(loop) }
    
export const stop = (): void => { tick.stop() }