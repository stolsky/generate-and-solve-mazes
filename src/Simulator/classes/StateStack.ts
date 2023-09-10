interface State {
    enter(): void
    exit(): void
    render(): void
    update(delta_time: number): void
}

const states: State[] = []


const is_empty = () => states.length === 0

const pop = () => {
    if (!is_empty()) {
        const state = states.pop()
        if (state) {
            state.exit()
        }
    }
    return this
}

const push = (state: State) => {
    states.push(state)
    state.enter()
    return this
}

const render = () => {
    states.forEach((state) => state.render());
}

const update = (delta_time: number) => {
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