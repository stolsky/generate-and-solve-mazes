import { InformationCollection } from "../types/Information"

const SolverInformation: InformationCollection = {
    BFS: {
        ID: 1,
        FULL: "BFS (Breadth-first search)",
        SHORT: "BFS"
    },
    DFS: {
        ID: 2,
        FULL: "DFS (Depth-first search)",
        SHORT: "DFS"
    },
    Dijkstra: {
        ID: 3,
        FULL: "Dijkstra's algorithm",
        SHORT: "Dijkstra"
    },
    AStar: {
        ID: 4,
        FULL: "A* search",
        SHORT: "A*"
    },
    NoSolver: {
        ID: -1,
        FULL: "Requested solver information not found",
        SHORT: "Error"
    }
} as const

export default SolverInformation