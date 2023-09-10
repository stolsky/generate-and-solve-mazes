import Task from "./Task"

const tasks: Task[] = []

const add = (task: Task) => tasks.push(task)

const get_all = () => tasks

export {
    add,
    get_all
}