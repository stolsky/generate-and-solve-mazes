import {
    NoSolver,
    SOLVER_TYPE
} from "./SolverInformation"
import AStar from "./AStar"
import BFS from "./BFS"
import DFS from "./DFS"
import Dijkstra from "./Dijkstra"
import type Grid from "../classes/Grid"
import Solver from "./Solver"

const create_solver = (id: number, grid: Grid): Solver => {
    if (id === SOLVER_TYPE.A_STAR) {
        return new AStar(id, grid)
    }
    if (id === SOLVER_TYPE.BFS) {
        return new BFS(id, grid)
    }
    if (id === SOLVER_TYPE.DFS) {
        return new DFS(id, grid)
    }
    if (id === SOLVER_TYPE.DIJKSTRA) {
        return new Dijkstra(id, grid)
    }
    return new Solver(NoSolver.ID)
}

export default create_solver