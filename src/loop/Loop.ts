import {
    is_empty as is_state_stack_empty,
    render,
    update
} from "./StateStack"
import {
    show_play_button,
    update_runtime
} from "../simulator/ui/components/controls/Controls"

import Ticker from "./Ticker"
import Value from "../global/Value"

class Loop {

    private static Instance: Loop

    private _runtime: number
    private slow_down_counter: number
    private readonly speed_multiplier_max: number
    private readonly speed_multiplier_min: number
    private _speed_multiplier: number
    private readonly ticker: Ticker

    private loop (delta_time: number): void {

        if (is_state_stack_empty()) {
            stop()

            // TODO remove from loop => use broker?
            show_play_button()
        }
    
        const speed = this.speed_multiplier
        if (speed < 1 && this.slow_down_counter < 1 / speed) {
            this.slow_down_counter = this.slow_down_counter + 1
            return
        }
    
        const adjusted_delta_time = speed * delta_time
        this._runtime = this.runtime + adjusted_delta_time
        
        // TODO remove from loop
        // TODO use broker ??
        update_runtime(this.runtime)
    
        // TODO how to skip the rendering of an entire State
        for (let i = 0; i < speed; i = i + 1) {
            update(delta_time)
            render()
        }
    
        if (speed < 1) {
            this.slow_down_counter = 0
        }
    }
    
    constructor(speed_multiplier: Value, ticker: Ticker) {
        this._runtime = 0
        this.slow_down_counter = 0
        this.speed_multiplier_max = speed_multiplier.max
        this.speed_multiplier_min = speed_multiplier.min
        this._speed_multiplier = speed_multiplier.std
        this.ticker = ticker
    }

    static getInstance (speed_multiplier?: Value, ticker?: Ticker): Loop {
        if (Loop.Instance === undefined && speed_multiplier instanceof Value && ticker instanceof Ticker) {
            Loop.Instance = new Loop(speed_multiplier, ticker)
        }
        return Loop.Instance
    }

    get runtime (): number {
        return this._runtime
    }

    get speed_multiplier (): number {
        return this._speed_multiplier
    }

    set speed_multiplier (multiplier: number) {
        if (multiplier >= this.speed_multiplier_min
            && multiplier <= this.speed_multiplier_max) {
            this._speed_multiplier = multiplier
        }
    }

    start (): void {
        this.ticker.start(this.loop)
    }
    
    stop (): void {
        this.ticker.stop()
    
    }
}

export default Loop