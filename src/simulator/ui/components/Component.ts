import { create } from "./utilities"

class Component {

    private readonly html_element: HTMLElement

    constructor(tag_name: string, class_name: string) {
        this.html_element = create(tag_name, class_name)
    }

    disable (): void {
        this.get_html_element().classList.add("Disabled")
    }

    enable (): void {
        this.get_html_element().classList.remove("Disabled")
    }

    get_html_element (): HTMLElement {
        return this.html_element
    }

    hide (): this {
        this.get_html_element().style.display = "none"
        return this
    }

    set_background_color (color: string): this {
        this.get_html_element().style.backgroundColor = color
        return this
    }

    set_content (content: string): this {
        this.html_element.textContent = content
        return this
    }

    show (): this {
        this.get_html_element().style.display = "block"
        return this
    }
}

export default Component