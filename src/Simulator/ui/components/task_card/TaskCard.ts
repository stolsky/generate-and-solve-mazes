import Component from "../Component";
import Container from "../Container";
import RenderingContextWrapper from "../ContextWrapper";

import "./taskcard.css"

class TaskCard extends Container {

    private title: Component
    private canvas: Component
    private position: Component

    private create_canvas = (width: number, height: number) => {
        const canvas = new Component("canvas", "Canvas")
        const element = canvas.get_html_element() as HTMLCanvasElement
        element.width = width
        element.height = height
        return canvas
    }

    constructor(canvas_width: number, canvas_height: number) {
        super("TaskCard")
        this.title = new Component("h3", "Title")
        this.canvas = this.create_canvas(canvas_width, canvas_height)
        this.position = new Component("p", "Position")

        this.append_child(this.title)
            .append_child(this.canvas)
            .append_child(this.position)
    }

    get_context() {
        const canvas = this.canvas.get_html_element() as HTMLCanvasElement
        return new RenderingContextWrapper(canvas.getContext("2d"))
    }

    set_position(position: number) {
        this.position.set_content(position.toString(10))
        return this
    }

    set_title(title: string) {
        this.title.set_content(title)
        return this
    }
}

export default TaskCard