import type Information from "../types/Information"

export const SOLVER_TYPE = {
    BFS: 0,
    DFS: 1,
    DIJKSTRA: 2,
    A_STAR: 3
} as const

const SolverInformation: readonly Information[] = [
    {
        ID: 0,
        FULL: "BFS (Breadth-first search)",
        SHORT: "BFS"
    },
    {
        ID: 1,
        FULL: "DFS (Depth-first search)",
        SHORT: "DFS"
    },
    {
        ID: 2,
        FULL: "Dijkstra's algorithm",
        SHORT: "Dijkstra"
    },
    {
        ID: 3,
        FULL: "A* search",
        SHORT: "A*"
    }
] as const

export const NoSolver: Information = {
    ID: -1,
    FULL: "Requested solver information not found",
    SHORT: "Error"
} as const

export const get_information_by_id = (id: number): Information => SolverInformation[id] ?? NoSolver