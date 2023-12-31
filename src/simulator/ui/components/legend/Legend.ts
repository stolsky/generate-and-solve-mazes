import "./legend.css"

import Component from "../Component"
import Container from "../Container"

interface LegendOptions {
    colors: Array<{ color: string, label: string }>
}

const create_item = (color: string, label: string): Container => new Container("Item").append(
    new Component("Tile").set_background_color(color), 
    new Component("Label").set_content(label)
)

const init = (options: LegendOptions): Container => {
    const items = new Container("Items")
    options.colors.forEach((color) => items.append_child(create_item(color.color, color.label)))
    return new Container("Legend").append(
        new Component("Title", "h3").set_content("Legend"),
        items
    )
}

export default init
export {
    type LegendOptions
}