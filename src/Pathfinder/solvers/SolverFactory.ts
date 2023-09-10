import Grid from "../classes/Grid"
import AStar from "./AStar"
import Solver from "./Solver"

const Solvers = {
    BFS: 1,
    DFS: 2,
    Dijkstra: 3,
    AStar: 4
} as const

const create_solver = (id: number, grid: Grid): Solver | undefined => {
    if (id === 4) {
        return new AStar(grid)
    }
}

export default create_solver
export {
    Solvers
}