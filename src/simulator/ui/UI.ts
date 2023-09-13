import './ui.css'

import init_content, { type ContentOptions } from "./components/content/Content"
import init_legend, { type LegendOptions } from "./components/legend/Legend"
import Container from "./components/Container"
import init_controls from "./components/controls/Controls"
import init_log from "./components/log/Log"
import init_table from "./components/table/Table"

const init = (content: ContentOptions, legend: LegendOptions): void => {
    const layout = new Container("Layout").append(
        init_content(content),
        new Container("Results").append(
            init_table(),
            init_log(),
            init_legend(legend)
        ),
        init_controls()
    )
    document.body.appendChild(layout.get_html_element())
}

export default init
