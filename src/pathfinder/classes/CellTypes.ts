enum MainType {
    NONE = -1,
    FLOOR = 0,
    WALL = 1,
    START = 2,
    GOAL = 3
}

enum SubType {
    NONE = -1,
    SEARCH = 4,
    EXPANDED = 5,
    PATH = 6
}

// https://www.schemecolor.com/rainbow-child.php
const TypeColor = {
    expanded: {
        color: "#feee5e",
        label: "expanded",
        type: SubType.EXPANDED
    },
    floor: {
        color: "#FFFFFF",
        label: "floor",
        type: MainType.FLOOR
    },
    goal: {
        color: "#a4cf09",
        label: "goal",
        type: MainType.GOAL
    },
    path: {
        color: "#7349a2",
        label: "path",
        type: SubType.PATH
    },
    search: {
        color: "#f39b50",
        label: "search",
        type: SubType.SEARCH
    },
    start: {
        color: "#f03e3e",
        label: "start",
        type: MainType.START
    },
    wall: {
        color: "#000000",
        label: "wall",
        type: MainType.WALL
    }
} as const

export {
    MainType,
    SubType,
    TypeColor
}