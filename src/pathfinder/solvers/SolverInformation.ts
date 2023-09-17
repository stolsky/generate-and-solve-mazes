import { InformationCollection } from "../types/Information"

const SolverInformation: InformationCollection = {
    BFS: {
        id: 1,
        full: "BFS (Breadth-first search)",
        short: "BFS"
    },
    DFS: {
        id: 2,
        full: "DFS (Depth-first search)",
        short: "DFS"
    },
    Dijkstra: {
        id: 3,
        full: "Dijkstra's algorithm",
        short: "Dijkstra"
    },
    AStar: {
        id: 4,
        full: "A* search",
        short: "A*"
    },
    NoSolver: {
        id: -1,
        full: "Requested solver information not found",
        short: "Error"
    }
} as const

export default SolverInformation