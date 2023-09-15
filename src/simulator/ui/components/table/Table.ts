import "./table.css"

import Component from "../Component"
import Container from "../Container"
import { subscribe } from "../../../Broker"

interface Identifier {
    id: number
    label: string
}

interface TableOptions {
    columns: Identifier[]
    rows: Identifier[]
}

const update = (message: string): void => {

    // reorder if necessary
}

const create_header = (items: Identifier[]): Container => {
    const row = new Container("", "tr")
    items.forEach((item) => {
        row.append_child(
            new Component("", "th")
                .set_content(item.label)
        )
    })
    return new Container("", "thead")
        .append_child(row)
}

const create_body = (items: Identifier[], width: number): Container => {
    const body = new Container("", "tbody")
    items.forEach((item) => {
        const row = new Container("", "tr")
        row.append_child(
            new Component("", "td")
                .set_content(item.label)
        )
        for (let i = 1; i < width; i = i + 1) {
            row.append_child(
                new Component("", "td")
                    .set_content("-")
            )
        }
        body.append_child(row)
    })
    return body
}

const init = (table_options: TableOptions): Container => {
    subscribe("Results", update)
    return new Container("Results")
        .append(
            new Component("Title", "h3")
                .set_content("Results"),
            new Container("Table")
                .append(
                create_header(table_options.columns),
                create_body(
                    table_options.rows,
                    table_options.columns.length
                )
            )
    )
}

export default init
export {
    type TableOptions
}