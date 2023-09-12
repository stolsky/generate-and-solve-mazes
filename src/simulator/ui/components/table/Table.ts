import "./table.css"

import Component from "../Component"
import Container from "../Container"
import { subscribe } from "../../../Broker"

let content: Container

const update = (message: string): void => {

}

const init = (): Container => {

    content = new Container("Table")

    // subscribe("Log", update)

    return new Container("Table").append(
        new Component("h3", "Title").set_content("Results"),
        content
    )
}

export default init