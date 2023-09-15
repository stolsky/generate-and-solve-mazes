import Component from "./Component"

class Container extends Component {

    constructor(class_name: string, tag_name = "div") {
        super(class_name, tag_name)
    }

    append(...children: Array<Component | Container>): this {
        children.forEach((child) => this.append_child(child))
        return this
    }

    append_child(child: Component | Container): this {
        this.get_html_element().appendChild(child.get_html_element())
        return this
    }

}

export default Container