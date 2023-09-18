import "./table.css"

import Component from "../Component"
import Container from "../Container"
import { get_results_of_solver } from "../../../../database/database"
import { subscribe } from "../../../Broker"

interface Identifier {
    id: number
    label: string
}

interface TableOptions {
    columns: Identifier[]
    rows: Identifier[]
}

const output: Record<string, Container> = {}

const update = (message: string): void => {
    if (message in output) {
        const results = get_results_of_solver(Number.parseInt(message, 10))
        if (results !== undefined) {
            const children = output[message].get_children()
            // for (let i = 1; i < children.length; i = i + 1) {
            //     children[i].textContent = items[i - 1]
            // }
        }
    }
}

const finalize_iteration = (_message: string): void => {
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
        output[item.id.toString(10)] = row
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

    subscribe("SolutionReady", update)
    subscribe("AllSolutionsFinished", finalize_iteration)

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