import "./log.css"

import Component from "../Component"
import Container from "../Container"
import { subscribe } from "../../../Broker"

let text_output: Container

const update = (message: string): void => {
    let text_message
    if (message === "%SEPERATOR%") {
        text_message = new Component("p", "Seperator")
    } else {
        text_message = new Component("p", "Message")
        text_message.set_content(message)
    }
    
    text_output.append_child(text_message)
    const elem = text_output.get_html_element()
    elem.scrollTop = elem.scrollHeight
}

const init = (): Container => {

    text_output = new Container("Text")

    subscribe("Log", update)

    return new Container("Log").append(
        new Component("h3", "Title").set_content("Log"),
        text_output
    )
}

export default init