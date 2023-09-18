import type Information from "../types/Information"

export const GENERATOR_TYPE = {
    EMPTY_MAZE: 0,
    GROWING_TREE: 1,
    KRUSKALS_ALGORITHM: 2,
    PRIMS_ALGORITHM: 3,
    RECURSIVE_BACKTRACKING: 4
} as const

const GeneratorInformation: readonly Information[] = [
    {
        ID: 0,
        FULL: "",
        SHORT: "Empty"
    },
    {
        ID: 1,
        FULL: "",
        SHORT: "GrowingTree"
        
    },
    {
        ID: 2,
        FULL: "",
        SHORT: "Kruskal"
    },
    {
        ID: 3,
        FULL: "",
        SHORT: "Prim"
    },
    {
        ID: 4,
        FULL: "",
        SHORT: "RecursiveBacktracking"
    }
] as const

export const NoGenerator: Information = {
    ID: -1,
    FULL: "Requested generator information not found",
    SHORT: "Error"
} as const

export const get_information_by_id = (id: number): Information => GeneratorInformation[id] ?? NoGenerator