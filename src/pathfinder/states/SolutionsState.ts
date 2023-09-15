import {
    find_positions_from_sectors,
    shuffle
} from "../utilities"
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
import { MainType } from "../classes/CellTypes"
import { publish } from "../../simulator/Broker"
import Solver from "../solvers/Solver"

const validate_position = (position: IPosition, grid: Grid): IPosition => {
    let cell = grid.get_cell(position.x, position.y)
    if (cell instanceof Cell && cell.type === MainType.WALL) {
        const neighbours = grid.get_moore_neighbourhood(cell)
        shuffle(neighbours)
        // if maze was generated correctly there must be a floor tile
        // in every moore neighbourhood
        cell = neighbours.filter((neighbour) => neighbour.type === MainType.FLOOR).pop()
        if (cell instanceof Cell) {
            position.x = cell.x
            position.y = cell.y
        } else {
            position.x = 0
            position.y = 0
        }
    }
    return position
}

const find_initial_positions = (grid: Grid): {
    start: IPosition,
    goal: IPosition
} => {
    const { start, goal } = find_positions_from_sectors(grid.width, grid.height)
    return {
        start: validate_position(start, grid),
        goal: validate_position(goal, grid)
    }
}

class SolutionsState implements State {

    private runtime: number
    private readonly cell_size: number
    private is_finished: boolean
    private readonly delay_after_finished: number
    private finished_timestamp: number


    constructor(grid: Grid) {
        const { start, goal } = find_initial_positions(grid)
        get_all_tasks().forEach((task) => {
            const solver = create_solver(task.get_solver_id(), grid.clean_copy())
            solver.set_start_position(start)
            solver.set_goal_position(goal)
            task.solver = solver
        })
        this.runtime = 0
        this.cell_size = Configuration.get_property_value("grid_cell_size") as number
        this.is_finished = false
        this.delay_after_finished = Configuration.get_property_value("delay_after_finished") as number
        this.finished_timestamp = 0
    }

    enter(): void {
        // console.log("enter solution state")
    }

    exit(): void {
        // console.log("exit solution state")
    }

    render(): void {
        if (!this.is_finished) {
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
                this.is_finished = true
                this.finished_timestamp = this.runtime
            }
        }
    }

    update(delta_time: number): void {
        this.runtime = this.runtime + delta_time
        if (this.is_finished) {
            if (this.runtime - this.finished_timestamp > this.delay_after_finished) {
                publish("Log", "%SEPERATOR%")
                pop_state()
            }
        } else {
            get_all_tasks().forEach((task) => {
                if (task.solver instanceof Solver) {
                    task.solver.perform_step()
                }
            })
        }
        
    }
}

export default SolutionsState