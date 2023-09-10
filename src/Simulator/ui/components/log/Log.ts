import { subscribe } from "../../../Broker"
import Component from "../Component"
import Container from "../Container"

import "./log.css"

let text_output: Container

const update = (message: string) => {
    const new_message = new Component("p", "Message")
    new_message.set_content(message)
    text_output.append_child(new_message)
}

const init = () => {

    text_output = new Container("Text")

    subscribe("Log", update)

    return new Container("Log").append(
        new Component("h3", "Title").set_content("Log"),
        text_output
    )
}

export default init