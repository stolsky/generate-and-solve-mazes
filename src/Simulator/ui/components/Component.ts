import { create } from "./utilities"

class Component {

    private html_element: HTMLElement

    constructor(tag_name: string, class_name: string) {
        this.html_element = create(tag_name, class_name)
    }

    get_html_element() {
        return this.html_element
    }

    hide() {
        this.get_html_element().style.display = "none"
        return this
    }

    set_background_color(color: string) {
        this.get_html_element().style.backgroundColor = color
        return this
    }

    set_content(content: string) {
        this.html_element.textContent = content
        return this
    }

    show() {
        this.get_html_element().style.display = "block"
        return this
    }
}

export default Component