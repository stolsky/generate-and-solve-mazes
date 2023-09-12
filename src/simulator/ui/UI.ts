import './ui.css'

import init_content, { type ContentOptions } from "./components/content/Content"
import Container from "./components/Container"
import init_controls from "./components/controls/Controls"
import init_legend from "./components/legend/Legend"
import init_log from "./components/log/Log"
import init_table from "./components/table/Table"
import init_title from "./components/title/Title"

const init = (content: ContentOptions): void => {
    const layout = new Container("Layout").append(
        init_content(content),
        init_title(),
        new Container("Results").append(
            init_table(),
            init_log(),
            init_legend()
        ),
        init_controls()
    )
    document.body.appendChild(layout.get_html_element())
}

export default init
