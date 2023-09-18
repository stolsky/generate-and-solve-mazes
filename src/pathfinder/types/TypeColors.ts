import {
    MAIN_TYPE,
    type MainType,
    SUB_TYPE,
    type SubType
} from "./CellType"

// https://www.schemecolor.com/rainbow-child.php
const TypeColors = {
    expanded: {
        color: "#9ec1cf", // "#0C43FF", // "#f39b50", // blue
        label: "Expanded",
        type: SUB_TYPE.EXPANDED
    },
    floor: {
        color: "#FFFFFF",
        label: "Floor",
        type: MAIN_TYPE.FLOOR
    },
    goal: {
        color: "#9ee09e", // "#29CA40", // "#a4cf09", // green
        label: "Goal",
        type: MAIN_TYPE.GOAL
    },
    path: {
        color: "#cc99c9", // "#972DA9", // "#7349a2", // purple
        label: "Path",
        type: SUB_TYPE.PATH
    },
    search: {
        color: "#feb144", // "#F58E16", // "#feee5e", // orange
        label: "Search",
        type: SUB_TYPE.SEARCH
    },
    start: {
        color: "#ff6663", // "#FF0C2C", // "#f03e3e", // red
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