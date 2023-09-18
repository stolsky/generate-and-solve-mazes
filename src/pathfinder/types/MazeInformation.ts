import type Information from "./Information"

export const MAZE_TYPE = {
    PERFECT: 0,
    IMPERFECT: 1,
    OBSTACLES: 2,
} as const

const MazeInformation: readonly Information[] = [
    {
        ID: 0,
        FULL: "perfect maze",
        SHORT: "perfect",
    },
    {
        ID: 1,
        FULL: "imperfect mazes",
        SHORT: "imperfect",
    },
    {
        ID: 2,
        FULL: "obstacles",
        SHORT: "obstacles",
    }
] as const

export const NoMaze: Information = {
    ID: -1,
    FULL: "Requested maze information not found",
    SHORT: "Error"
} as const

export const get_information_by_id = (id: number): Information => MazeInformation[id] ?? NoMaze