import "./controls.css"

import {
    get_speed_multiplier,
    set_speed_multiplier,
    start as start_loop,
    stop as stop_loop
} from "../../../Loop"
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

const init = (autostart = false): Container => {

    backward_button = new IconButton(Configuration.get_property_value("controls_icon_backward") as string, () => {
        const old_speed = get_speed_multiplier()
        set_speed_multiplier(old_speed * 0.5)
        current_speed.set_content(get_speed_multiplier().toString(10) + "x")
    })
    
    play_button = new IconButton(Configuration.get_property_value("controls_icon_play") as string, () => {
        show_pause_button()
        start_loop()
    })

    pause_button = new IconButton(Configuration.get_property_value("controls_icon_pause") as string, () => {
        show_play_button()
        stop_loop()
    })

    if (autostart) {
        show_pause_button()
    } else {
        show_play_button()
    }

    forward_button = new IconButton(Configuration.get_property_value("controls_icon_forward") as string, () => {
        const old_speed = get_speed_multiplier()
        set_speed_multiplier(old_speed * 2)
        current_speed.set_content(get_speed_multiplier().toString(10) + "x")
    })

    current_speed = new Component("p", "Speed")
        .set_content(get_speed_multiplier().toString(10) + "x")
    current_runtime = new Component("p", "Runtime")
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