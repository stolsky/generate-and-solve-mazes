import type Task from "./Task"

const tasks: Task[] = []

const add = (task: Task): void => {
    tasks.push(task)
}

const get_all = (): Task[] => tasks

export {
    add,
    get_all
}