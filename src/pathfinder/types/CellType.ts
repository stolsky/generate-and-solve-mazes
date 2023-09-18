export const MAIN_TYPE =  {
    NONE: -1,
    FLOOR: 0,
    WALL: 1,
    START: 2,
    GOAL: 3
} as const

export const SUB_TYPE = {
    NONE: -1,
    SEARCH: 4,
    EXPANDED: 5,
    PATH: 6
} as const

type ObjectValues<T> = T[keyof T]

type MainType = ObjectValues<typeof MAIN_TYPE>
type SubType = ObjectValues<typeof SUB_TYPE>

export {
    type MainType,
    type SubType,
}