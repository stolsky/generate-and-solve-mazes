import {
    pop as pop_state,
    type State
} from "../../simulator/classes/StateStack"
import Configuration from "../config/Configuration"
import create_solver from "../solvers/SolverFactory"
import { find_positions_from_sectors } from "../utilities"
import { get_all as get_all_tasks } from "../../simulator/classes/TaskList"
import type Grid from "../classes/Grid"
import Solver from "../solvers/Solver"

class SolutionsState implements State {

    private runtime: number
    private readonly cell_size: number

    constructor(grid: Grid) {
        const positions = find_positions_from_sectors(grid.width, grid.height)
        get_all_tasks().forEach((task) => {
            const solver = create_solver(task.get_solver_id(), grid.clean_copy())
            if (solver !== undefined) {
                solver.set_start_position(positions.start)
                solver.set_goal_position(positions.goal)
                task.solver = solver
            }
        })
        this.runtime = 0
        this.cell_size = Configuration.get_property_value("grid_cell_size") as number
    }

    enter(): void {
        // console.log("enter solution state")
    }

    exit(): void {
        // console.log("exit solution state")
    }

    render(): void {
        let all_finished = true
        get_all_tasks().forEach((task) => {
            if (task.is_finished) {
                return
            }
            const solver = task.solver
            if (solver instanceof Solver) {
                task.render(
                    solver.get_updates(),
                    this.cell_size
                )
                if (solver.is_finished()) {
                    task.send_results(this.runtime)
                    task.is_finished = true
                } else {
                    all_finished = false
                }
            }
        })
        if (all_finished) {
            pop_state()
        }
    }

    update(delta_time: number): void {
        this.runtime = this.runtime + delta_time
        get_all_tasks().forEach((task) => {
            if (task.solver instanceof Solver) {
                task.solver.perform_step()
            }
        })
    }
}

export default SolutionsState