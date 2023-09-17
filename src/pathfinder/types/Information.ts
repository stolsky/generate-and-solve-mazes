interface Information {
    ID: number
    FULL: string
    SHORT: string

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