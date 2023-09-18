import Container from "../Container"
import TaskCard from "../task_card/TaskCard"

interface ContentOptions {
    tasks_amount: number,
    canvas_width: number,
    canvas_height: number
}

const taskcards: TaskCard[] = []

const init = ({
    tasks_amount,
    canvas_width,
    canvas_height
}: ContentOptions): Container => {

    const container = new Container("Content")
    for (let i = 0; i < tasks_amount; i = i + 1) {
        const taskcard = new TaskCard(canvas_width, canvas_height)
        container.append_child(taskcard)
        taskcards.push(taskcard)
    }

    return container
}

export const get_task_cards = (): TaskCard[] => taskcards

export default init
export {
    type ContentOptions
}