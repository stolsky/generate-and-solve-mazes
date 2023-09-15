import Component from "../Component";

class IconButton extends Component {

    constructor(icon_name: string, listener: EventListener) {
        super(`IconButton ${icon_name}`, "button")
        this.get_html_element().addEventListener("pointerdown", listener)
    }

}

export default IconButton