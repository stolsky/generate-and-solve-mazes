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

// https://www.schemecolor.com/rainbow-child.php
const TypeColorCollection = {
    expanded: {
        color: "#feee5e",
        label: "Expanded",
        type: SUB_TYPE.EXPANDED
    },
    floor: {
        color: "#FFFFFF",
        label: "Floor",
        type: MAIN_TYPE.FLOOR
    },
    goal: {
        color: "#a4cf09",
        label: "Goal",
        type: MAIN_TYPE.GOAL
    },
    path: {
        color: "#7349a2",
        label: "Path",
        type: SUB_TYPE.PATH
    },
    search: {
        color: "#f39b50",
        label: "Search",
        type: SUB_TYPE.SEARCH
    },
    start: {
        color: "#f03e3e",
        label: "Start",
        type: MAIN_TYPE.START
    },
    wall: {
        color: "#000000",
        label: "Wall",
        type: MAIN_TYPE.WALL
    }
} as const

const get_color_by_type = (type: number): string =>
    Object.values(TypeColorCollection).find((color) => color.type === type)?.color ?? ""

export {
    MAIN_TYPE,
    type MainType,

    SUB_TYPE,
    type SubType,
    
    get_color_by_type,
    TypeColorCollection
}