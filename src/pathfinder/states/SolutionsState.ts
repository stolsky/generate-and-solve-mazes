import {
    pop as pop_state,
    type State
} from "../../simulator/classes/StateStack"
import Cell from "../classes/Cell"
import Configuration from "../config/Configuration"
import create_solver from "../solvers/SolverFactory"
import { get_all as get_all_tasks } from "../../simulator/classes/TaskList"
import type Grid from "../classes/Grid"
import type IPosition from "../classes/IPosition"
import { publish } from "../../simulator/Broker"
import Solver from "../solvers/Solver"

class SolutionsState implements State {

    private readonly cell_size: number

    private find_start_position(width: number, height: number): IPosition {
        // start_pos = solver.find_random_position()
        return { x: 1, y: 1 } 
    }

    private find_goal_position(width: number, height: number): IPosition {
        // goal_pos = solver.find_random_position()
        return { x: width - 2, y: height - 2 }
    }

    private find_positions(width: number, height: number): {
        start: IPosition,
        goal: IPosition
    } {
        return {
            start: this.find_start_position(width, height),
            goal: this.find_goal_position(width, height)
        }
    }

    constructor(grid: Grid) {
        const positions = this.find_positions(grid.width, grid.height)

        // TODO better setting colors
        publish("Add_legend_item", `${Cell.Color.goal.label }:${Cell.Color.goal.color}`)
        publish("Add_legend_item", `${Cell.Color.search.label }:${Cell.Color.search.color}`)
        publish("Add_legend_item", `${Cell.Color.visited.label }:${Cell.Color.visited.color}`)
        publish("Add_legend_item", `${Cell.Color.path.label }:${Cell.Color.path.color}`)
        get_all_tasks().forEach((task) => {
            task.set_render_options({ colors: {
                goal: Cell.Color.goal.color,
                path: Cell.Color.path.color,
                search: Cell.Color.search.color,
                visited: Cell.Color.visited.color
            } })
            const solver = create_solver(task.get_solver_id(), grid.copy())
            if (solver !== undefined) {
                solver.set_start_position(positions.start)
                solver.set_goal_position(positions.goal)
                task.solver = solver
            }
        })
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
            const solver = task.solver
            if (solver instanceof Solver && !solver.is_finished()) {
                task.render(
                    solver.get_updates(),
                    this.cell_size
                )
                all_finished = false
            }
        })
        if (all_finished) {
            publish("Log", "All mazes solved")
            pop_state()
        }
    }

    update(): void {
        get_all_tasks().forEach((task) => {
            if (task.solver instanceof Solver) {
                task.solver.perform_step()
            }
        })
    }
}

export default SolutionsState