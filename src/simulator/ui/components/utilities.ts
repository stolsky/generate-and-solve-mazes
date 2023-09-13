const create = (tag_name: string, class_name?: string): HTMLElement => {
    const use_tag = (tag_name.length > 0) ? tag_name : "div"
    const element = document.createElement(use_tag)
    if (element instanceof HTMLElement && class_name !== undefined && class_name.length > 0) {
        class_name
            .split(' ')
            .filter((name) => name.length > 0)
            .forEach((part) => {
                element.classList.add(part)
            })
    }
    return element
}

const add_leading_zero = (value: number): "0" | "" => ((value < 10) ? "0" : "")

const format_time = (msec: number): string => {
    const seconds = msec / 1000
    const seconds_string = `${add_leading_zero(seconds % 60)}${(seconds % 60).toFixed(2)}`
    const minutes = seconds / 60
    const minutes_string = `${add_leading_zero(minutes % 60)}${Math.floor(minutes % 60)}`
    return `${minutes_string}:${seconds_string}`
}

export {
    create,
    format_time
}