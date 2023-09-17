interface Information {
    ID: number
    FULL: string
    SHORT: string

    pros?: string
    const?: string
}

type InformationCollection = Record<string, Information>;

export {
    type Information,
    type InformationCollection
}