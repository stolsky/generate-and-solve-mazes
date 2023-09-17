import "./controls.css"

import {
    get_speed_multiplier,
    set_speed_multiplier,
    start as start_loop,
    stop as stop_loop
} from "../../../../loop/Loop"
import Component from "../Component"
import Configuration from "../../../config/Configuration"
import Container from "../Container"
import { format_time } from "../utilities"
import IconButton from "./IconButton"

let backward_button: IconButton
let forward_button: IconButton
let play_button: IconButton
let pause_button: IconButton
let current_speed: Component
let current_runtime: Component

const show_play_button = (): void => {
    pause_button.hide()
    play_button.show()
}

const show_pause_button = (): void => {
    play_button.hide()
    pause_button.show()
}

const update_speed_multiplier = (multiplier: number): boolean => {
    const old_speed = get_speed_multiplier()
    const new_speed = old_speed * multiplier
    const success = set_speed_multiplier(new_speed)
    if (success) {
        current_speed.set_content(new_speed.toString(10) + "x")
    }
    return success
}

const init = (autostart = false): Container => {

    backward_button = new IconButton(
        Configuration.get_property_value("controls_icon_backward") as string,
        () => {
            if (update_speed_multiplier(0.5)) {
                backward_button.disable()
            }
        }
    )
    
    play_button = new IconButton(Configuration.get_property_value("controls_icon_play") as string, () => {
        show_pause_button()
        start_loop()
    })

    pause_button = new IconButton(Configuration.get_property_value("controls_icon_pause") as string, () => {
        show_play_button()
        stop_loop()
    })

    if (autostart) {
        start_loop()
        show_pause_button()
    } else {
        show_play_button()
    }

    forward_button = new IconButton(
        Configuration.get_property_value("controls_icon_forward") as string,
        () => {
            if (update_speed_multiplier(2)) {
                forward_button.disable()
            }
        }
    )

    current_speed = new Component("Speed")
        .set_content(get_speed_multiplier().toString(10) + "x")
    current_runtime = new Component("Runtime")
        .set_content("00:00.00")

    return new Container("Controls").append(
        backward_button,
        play_button,
        pause_button,
        forward_button,
        current_speed,
        current_runtime
    )
}

const update_runtime = (runtime: number): void => {
    current_runtime.set_content(format_time(runtime))
}

export default init
export {
    show_pause_button,
    show_play_button,
    update_runtime
}