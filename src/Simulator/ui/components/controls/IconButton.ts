import Component from "../Component";

class IconButton extends Component {

    constructor(icon_name: string, listener: EventListener) {
        super("button", `IconButton ${icon_name}`)
        this.get_html_element().addEventListener("pointerdown", listener)
    }

}

export default IconButton