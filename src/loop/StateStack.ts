interface State {
    enter: () => void
    exit: () => void
    render: () => void
    update: (delta_time: number) => void
}

const states: State[] = []

export const is_empty = (): boolean => states.length === 0

export const pop = (): void => {
    if (!is_empty()) {
        const state = states.pop()
        if (state !== undefined) {
            state.exit()
        }
    }
}

export const push = (state: State): void => {
    states.push(state)
    state.enter()
}

export const render = (): void => {
    states.forEach((state) => {
        state.render()
    })
}

export const update = (delta_time: number): void => {
    if (!is_empty()) {
        states[states.length - 1].update(delta_time)
    }
}

export {
    type State,
}