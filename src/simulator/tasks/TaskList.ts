import type Task from "./Task"

const tasks: Task[] = []

export const add = (task: Task): void => {
    tasks.push(task)
}

export const get_all_tasks = (): Task[] => tasks

export const get_all_unfinished_tasks = (): Task[] =>
    tasks.filter((filter) => !filter.is_finished)