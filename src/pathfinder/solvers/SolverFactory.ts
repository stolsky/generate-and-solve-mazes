import AStar from "./AStar"
import BFS from "./BFS"
import DFS from "./DFS"
import Dijkstra from "./Dijkstra"
import type Grid from "../classes/Grid"
import type Information from "../types/Information"
import Solver from "./Solver"
import SolverInformation from "./SolverInformation"

const create_solver = (id: number, grid: Grid): Solver => {
    if (id === SolverInformation.AStar.ID) {
        return new AStar(grid)
    }
    if (id === SolverInformation.BFS.ID) {
        return new BFS(grid)
    }
    if (id === SolverInformation.DFS.ID) {
        return new DFS(grid)
    }
    if (id === SolverInformation.Dijkstra.ID) {
        return new Dijkstra(grid)
    }
    return new Solver()
}

const get_solver_info_by_id = (id: number): Information =>
    Object.values(SolverInformation).find((solver) => solver.ID === id) ?? SolverInformation.NoSolver

export default create_solver
export {
    get_solver_info_by_id,
    SolverInformation
}