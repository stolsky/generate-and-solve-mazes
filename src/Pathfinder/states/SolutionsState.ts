import { State } from "../../Simulator/classes/StateStack"
import { get_all as get_all_tasks } from "../../Simulator/classes/TaskList"

import Configuration from "../config/Configuration"
import create_solver from "../solvers/SolverFactory"
import Grid from "../classes/Grid"
import IPosition from "../classes/IPosition"

class SolutionsState implements State {

    private cell_size: number

    constructor(grid: Grid) {
        // TODO create start & end position
        let start_pos: IPosition
        let goal_pos: IPosition

        get_all_tasks().forEach((task) => {
            task.set_render_options({ colors: {
                goal: "#00FF00",
                visited: "#FFFF00"
            }})
            const solver = create_solver(task.get_solver_id(), grid.copy())
            if (solver) {
                if (!start_pos || !goal_pos) {
                    start_pos = { x: 1, y: 1 } // solver.find_random_position()
                    goal_pos = { x: grid.width - 2, y: grid.height - 2 } // solver.find_random_position()
                }
                solver.set_start_position(start_pos)
                solver.set_goal_position(goal_pos)
                task.solver = solver
            }
        })
        this.cell_size = Configuration.get_property_value("grid_cell_size") as number
    }

    enter() {
        // console.log("enter solution state")
    }

    exit() {
        // console.log("exit solution state")
    }

    render() {
        get_all_tasks().forEach((task) => {
            if (task.solver) {
                task.render(
                    task.solver.get_updates(),
                    this.cell_size
                )
            }
        })
    }

    update() {
        get_all_tasks().forEach((task) => {
            if (task.solver) {
                task.solver.perform_step()
            }
        })
    }
}

export default SolutionsState