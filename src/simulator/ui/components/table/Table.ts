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

type DataTable = Record<
    string,
    {
        results: number[][],
        ref: Container | undefined
    }
>

const data_table: DataTable = {}

const update = (message: string): void => {
    // first part is reserved for id
    const [id, ...items] = message.split("/")
    if (id in data_table) {
        const dataset = data_table[id]

        let count = 0
        const datasets = Object.values(data_table)
        const size = datasets.length
        datasets.forEach((dataset) => count = (count + dataset.results.length) % size)

        dataset.results.push(items.map((str) => Number.parseInt(str, 10)))
        items.push((count + 1).toString(10))
        if (dataset.ref instanceof Container) {
            const children = dataset.ref.get_children()
            for (let i = 1; i < children.length; i = i + 1) {
                children[i].textContent = items[i - 1]
            }
        }
        
    }
}

const finalize_round = (_message: string): void => {
    // getting position
        
    // calculate points

    // reorder
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
        data_table[item.id.toString(10)].ref = row
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
    subscribe("IterationEnd", finalize_round)

    table_options.rows.forEach((item) => {
        data_table[item.id.toString(10)] = { results: [], ref: undefined }
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