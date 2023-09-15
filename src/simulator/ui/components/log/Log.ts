import "./log.css"

import Component from "../Component"
import Container from "../Container"
import { subscribe } from "../../../Broker"

let text_output: Container

const update = (message: string): void => {
    text_output.append_child(
        new Component()
            .set_content(message)
    ).scroll_to_bottom()
}

const init = (): Container => {
    subscribe("Log", update)
    text_output = new Container("Text")
    return new Container("Log").append(
        new Component("Title", "h3").set_content("Log"),
        text_output
    )
}

export default init