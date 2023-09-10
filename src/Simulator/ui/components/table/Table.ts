import { subscribe } from "../../../Broker"
import Component from "../Component"
import Container from "../Container"

import "./table.css"

let content: Container

const update = (message: string) => {

}

const init = () => {

    content = new Container("Table")

    // subscribe("Log", update)

    return new Container("Table").append(
        new Component("h3", "Title").set_content("Results"),
        content
    )
}

export default init