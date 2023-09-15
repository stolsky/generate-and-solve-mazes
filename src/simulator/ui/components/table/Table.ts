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
    criteria: {
        id: number
    }
}

type DataTable = Record<string, {
        results: number[][]
    }>;

const data_table: DataTable = {}

const update = (message: string): void => {
    // first part is reserved for id
    const [id, ...items] = message.split("/")
    data_table[id].results.push(items.map((str) => Number.parseInt(str, 10)))

    // update output

    // reorder if necessary
}

const create_head = (items: Identifier[]): Container => {
    const row = new Container("", "tr")
    items.forEach((item) => {
        row.append_child(
            new Component("", "th")
                .set_content(item.label)
        )
    })
    return new Container("", "thead")
        .append_child(row.append_child(new Component("", "th")
            .set_content("points*")))
}

const create_body = (items: Identifier[], width: number): Container => {
    const body = new Container("", "tbody")
    items.forEach((item) => {
        const row = new Container("", "tr")
        row.append_child(
            new Component("", "td")
                .set_content(item.label)
        )
        for (let i = 1; i < width + 1; i = i + 1) {
            row.append_child(
                new Component("", "td")
                    .set_content("-")
            )
        }
        body.append_child(row)
    })
    
    return body
}

const create_foot = (): Component => new Component("Hint", "p").set_content("*accumulated sum of received points of each iteration")

const init = (table_options: TableOptions): Container => {
    subscribe("Results", update)

    table_options.rows.forEach((item) => {
        data_table[item.id.toString(10)] = { results: [] }
    })

    return new Container("Results")
        .append(
            new Component("Title", "h3")
                .set_content("Results"),
            new Container("Table")
                .append(
                create_head(table_options.columns),
                create_body(
                    table_options.rows,
                    table_options.columns.length
                ),
                create_foot()
            )
    )
}

export default init
export {
    type TableOptions
}