import './ui.css'

import init_content,
    { type ContentOptions } from "./components/content/Content"
import init_legend,
    { type LegendOptions } from "./components/legend/Legend"
import init_table,
    { type TableOptions } from "./components/table/Table"
import Container from "./components/Container"
import init_controls from "./components/controls/Controls"
import init_log from "./components/log/Log"


const init = (
    content_options: ContentOptions,
    table_options: TableOptions,
    legend_options: LegendOptions
): void => {
    const layout = new Container("Layout").append(
        init_content(content_options),
        new Container("Results").append(
            init_table(table_options),
            init_log(),
            init_legend(legend_options)
        ),
        init_controls()
    )
    document.body.appendChild(layout.get_html_element())
}

export default init
