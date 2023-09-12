const create = (tagName: string, className?: string) => {
    let element = {} as HTMLElement
    if (tagName && tagName.length > 0) {
        element = document.createElement(tagName)
        if (element instanceof HTMLElement && className && className.length > 0) {
            className
                .split(' ')
                .filter((name) => name.length > 0)
                .forEach((part) => element.classList.add(part))
        }
    }
    return element
}

const add_leading_zero = (value: number) => ((value < 10) ? "0" : "")

const format_time = (msec: number) => {
    const seconds = msec / 1000
    const secondsString = `${add_leading_zero(seconds % 60)}${(seconds % 60).toFixed(2)}`
    const minutes = seconds / 60
    const minutesString = `${add_leading_zero(minutes % 60)}${Math.floor(minutes % 60)}`
    return `${minutesString}:${secondsString}`
}

export {
    create,
    format_time
}