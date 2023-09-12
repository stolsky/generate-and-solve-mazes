interface State {
    enter: () => void
    exit: () => void
    render: () => void
    update: (delta_time: number) => void
}

const states: State[] = []

const is_empty = (): boolean => states.length === 0

const pop = (): void => {
    if (!is_empty()) {
        const state = states.pop()
        if (state !== undefined) {
            state.exit()
        }
    }
}

const push = (state: State): void => {
    states.push(state)
    state.enter()
}

const render = (): void => {
    states.forEach((state) => {
        state.render()
    })
}

const update = (delta_time: number): void => {
    if (!is_empty()) {
        states.at(-1)?.update(delta_time)
    }
}

export {
    type State,
    is_empty,
    pop,
    push,
    render,
    update
}