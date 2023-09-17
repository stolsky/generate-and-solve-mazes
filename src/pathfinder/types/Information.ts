interface Information {
    id: number
    full: string
    short: string

    pros?: string
    const?: string
}

interface InformationCollection {
    [key: string]: Information
}

export {
    type Information,
    type InformationCollection
}