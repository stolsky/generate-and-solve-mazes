import { subscribe } from "../../../Broker"
import Component from "../Component"
import Container from "../Container"

import "./legend.css"

const add_item = (name: string, color: string) => {
    return new Container("Entry").append(
        new Component("span", "Tile").set_background_color(color), 
        new Component("span", "Label").set_content(name)
    )
}

// TODO better naming
const update = (message: string, add = true) => {
    if (message.length > 0) {
        // TODO extract message
        //add_entry(...)
    }
}

const init = () => {
    subscribe("Add_legend_item", (message: string) => update(message))
    subscribe("Remove_legend_item", (message: string) => update(message, false))

    return new Container("Legend").append(
        new Component("h3", "Title").set_content("Legend")
    )
}

export default init