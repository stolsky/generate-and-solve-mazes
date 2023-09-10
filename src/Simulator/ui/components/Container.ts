import Component from "./Component"

class Container extends Component {

    constructor(class_name: string) {
        super("div", class_name)
    }

    append(...children: Array<Component | Container>) {
        children.forEach((child) => this.append_child(child))
        return this
    }

    append_child(child: Component | Container) {
        this.get_html_element().appendChild(child.get_html_element())
        return this
    }

}

export default Container