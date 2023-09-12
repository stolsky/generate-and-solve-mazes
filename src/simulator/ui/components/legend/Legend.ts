import "./legend.css"

import Component from "../Component"
import Container from "../Container"
import { subscribe } from "../../../Broker"

let items: Container

const add_item = (name: string, color: string): void => {
    items.append_child(new Container("Item").append(
        new Component("span", "Tile").set_background_color(color), 
        new Component("span", "Label").set_content(name)
    ))
}

const update = (message: string): void => {
    if (message.length > 0 && message.includes(":")) {
        const [key, value] = message.split(":")
        // TODO add if same key and value
        // TODO replace if same key and different value
        add_item(key, value)
    }
}

const init = (): Container => {

    subscribe(
        "Add_legend_item",
        (message: string) => { update(message) }
    )

    items = new Container("Items")
    return new Container("Legend").append(
        new Component("h3", "Title").set_content("Legend"),
        items
    )
}

export default init