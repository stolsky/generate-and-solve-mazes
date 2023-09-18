import {
    MAIN_TYPE,
    type MainType,
    SUB_TYPE,
    type SubType
} from "./CellType"

// https://www.schemecolor.com/rainbow-child.php
const TypeColors = {
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

const get_color = (type: number): string =>
    Object.values(TypeColors).find((color) => color.type === type)?.color ?? ""

const get_main_color_from_type = (main: MainType): string => get_color(main)

const get_sub_color_from_type = (sub: SubType): string => get_color(sub)

export {
    get_main_color_from_type,
    get_sub_color_from_type,
    TypeColors
}