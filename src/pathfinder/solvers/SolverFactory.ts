import AStar from "./AStar"
import BFS from "./BFS"
import DFS from "./DFS"
import Dijkstra from "./Dijkstra"
import type Grid from "../classes/Grid"
import Solver from "./Solver"

interface SolverInfoType {
    id: number,
    full: string,
    short: string
}

const SolverInfo = {
    BFS: { id: 1, full: "BFS (Breadth-first search)", short: "BFS"},
    DFS: { id: 2, full: "DFS (Depth-first search)", short: "DFS"},
    Dijkstra: { id: 3, full: "Dijkstra's algorithm", short: "Dijkstra"},
    AStar: { id: 4, full: "A* search", short: "A*"}
} as const
const NoSolverInfo = { id: -1, full: "Requested solver information not found", short: "Error" }

const create_solver = (id: number, grid: Grid): Solver => {
    if (id === SolverInfo.AStar.id) {
        return new AStar(grid)
    }
    if (id === SolverInfo.BFS.id) {
        return new BFS(grid)
    }
    if (id === SolverInfo.DFS.id) {
        return new DFS(grid)
    }
    if (id === SolverInfo.Dijkstra.id) {
        return new Dijkstra(grid)
    }
    return new Solver()
}

const get_solver_info_by_id = (id: number): SolverInfoType =>
    Object.values(SolverInfo).find((solver) => solver.id === id) ?? NoSolverInfo

export default create_solver
export {
    get_solver_info_by_id,
    SolverInfo
}