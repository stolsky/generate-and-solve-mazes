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
        label: "Expanded",
        type: SubType.EXPANDED
    },
    floor: {
        color: "#FFFFFF",
        label: "Floor",
        type: MainType.FLOOR
    },
    goal: {
        color: "#a4cf09",
        label: "Goal",
        type: MainType.GOAL
    },
    path: {
        color: "#7349a2",
        label: "Path",
        type: SubType.PATH
    },
    search: {
        color: "#f39b50",
        label: "Search",
        type: SubType.SEARCH
    },
    start: {
        color: "#f03e3e",
        label: "Start",
        type: MainType.START
    },
    wall: {
        color: "#000000",
        label: "Wall",
        type: MainType.WALL
    }
} as const

export {
    MainType,
    SubType,
    TypeColor
}