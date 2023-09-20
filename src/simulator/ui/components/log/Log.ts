import "./log.css"

import Component from "../Component"
import Container from "../Container"
import { subscribe } from "../../../../global/Broker"
import { format_time } from "../utilities"

let text_output: Container

const time_replacer = (_match: string, p1: string): string => format_time(Number.parseInt(p1, 10))

const parse_message = (message: string): string => {
    // TODO improve
    const index = message.indexOf("%t")
    if (index !== -1) {
        return message.replace(/%t(\d+)/, time_replacer)
    }
    return message
}

const update = (message: string): void => {
    text_output.append_child(
        new Component()
            .set_content(parse_message(message))
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