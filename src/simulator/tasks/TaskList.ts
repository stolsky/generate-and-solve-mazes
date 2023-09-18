import type Task from "./Task"

const tasks: Task[] = []

export const add = (task: Task): void => {
    tasks.push(task)
}

export const get_all = (): Task[] => tasks