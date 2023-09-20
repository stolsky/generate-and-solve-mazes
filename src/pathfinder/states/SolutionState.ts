// TODO refactor to avoid using TaskList from simulator
import {
    get_all_tasks,
    get_all_unfinished_tasks
} from "../../simulator/tasks/TaskList"
import {
    pop as pop_state,
    type State
} from "../../global/loop/StateStack"
import {
    store_positions,
    store_solution
} from "../../global/database/database"
import Configuration from "../config/Configuration"
import create_solver from "../solvers/SolverFactory"
import { find_initial_positions } from "../utilities"
import type Grid from "../classes/Grid"
import type Position from "../../global/Position"
import { publish } from "../../global/Broker"
import Solver from "../solvers/Solver"

class SolutionsState implements State {

    private readonly cell_size: number
    private readonly delay_after_finished: number
    private readonly goal_position: Position
    private readonly start_position: Position
    private finished_timestamp: number
    private runtime: number
    
    constructor(grid: Grid) {

        this.cell_size = Configuration.get_property_value("grid_cell_size") as number
        this.delay_after_finished = Configuration.get_property_value("delay_after_finished") as number

        this.finished_timestamp = 0
        this.runtime = 0
        
        const { start, goal } = find_initial_positions(grid)
        this.start_position = start
        this.goal_position = goal
        get_all_tasks().forEach((task) => {
            const solver = create_solver(task.get_solver_id(), grid.clean_copy())
            solver.set_start_position(start)
            solver.create_goal_cell(goal)
            task.solver = solver
        })
    }

    enter(): void {
        store_positions(
            this.start_position,
            this.goal_position
        )
    }

    exit(): void {
        publish("AllSolutionsFinished")
    }

    render(): void {
        get_all_unfinished_tasks().forEach((task) => {
            const solver = task.solver
            if (solver instanceof Solver) {
                task.render(
                    solver.get_updates(),
                    this.cell_size
                )
                if (solver.is_finished()) {
                    task.is_finished = true
                }
            }
        })
    }

    update(delta_time: number): void {
        this.runtime = this.runtime + delta_time
        const unfinished_tasks = get_all_unfinished_tasks()
        if (unfinished_tasks.length === 0) {
            if (this.finished_timestamp === 0) {
                this.finished_timestamp = this.runtime
            } else if (this.runtime - this.finished_timestamp > this.delay_after_finished) {
                pop_state()
            }
        }
        unfinished_tasks.forEach((task) => {
            const solver = task.solver
            if (solver instanceof Solver) {
                solver.perform_step()
                if (solver.is_finished()) {
                    store_solution({
                        solver_id: solver.id,
                        path_length: solver.path_length,
                        expanded_nodes: solver.expanded_cells_count,
                        time_taken_ms: this.runtime
                    })
                    publish("SolutionReady", `${solver.id}`)
                }
            }
        })
    }
}

export default SolutionsState