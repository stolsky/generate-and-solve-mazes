const MAIN_TYPE =  {
    NONE: -1,
    FLOOR: 0,
    WALL: 1,
    START: 2,
    GOAL: 3
} as const

const SUB_TYPE = {
    NONE: -1,
    SEARCH: 4,
    EXPANDED: 5,
    PATH: 6
}

type ObjectValues<T> = T[keyof T]

type MainType = ObjectValues<typeof MAIN_TYPE>
type SubType = ObjectValues<typeof SUB_TYPE>

export {
    MAIN_TYPE,
    type MainType,
    SUB_TYPE,
    type SubType,
}