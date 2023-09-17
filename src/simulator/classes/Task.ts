import {
    MAIN_TYPE,
    get_color_by_type
} from "../../pathfinder/types/CellType"
import type Cell from "../../pathfinder/classes/Cell"
import type ContextWrapper from "../ui/components/ContextWrapper"
import { format_time } from "../ui/components/utilities"
import { get_solver_info_by_id } from "../../pathfinder/solvers/SolverFactory"
import { publish } from "../Broker"
import type Solver from "../../pathfinder/solvers/Solver"

// TODO create PathfinderTask extend Task
class Task {

    private readonly renderer: ContextWrapper
    private readonly solver_id: number
    private _solver: Solver | undefined
    private _is_finished: boolean

    private get_color(cell: Cell): string {
        if (cell.type === MAIN_TYPE.WALL
            || cell.type === MAIN_TYPE.START
            || cell.type === MAIN_TYPE.GOAL
        ) {
            return get_color_by_type(cell.type)
        }
        
        let color = get_color_by_type(cell.sub_type)
        if (color.length === 0) {
            color = get_color_by_type(MAIN_TYPE.FLOOR)
        }
        return color
    }

    constructor(renderer: ContextWrapper, solver_id: number) {
        this.renderer = renderer
        this.solver_id = solver_id
        this._is_finished = false
    }

    get is_finished(): boolean {
        return this._is_finished
    }

    set is_finished(is_finished: boolean) {
        this._is_finished = is_finished
    }

    get solver(): Solver | undefined {
        return this._solver
    }

    set solver(solver: Solver) {
        this._solver = solver
        
    }

    reset():void {
        this.renderer.clear()
        this.is_finished = false
        this._solver = undefined
    }

    get_solver_id(): number {
        return this.solver_id
    }

    render(updates: Cell[], size: number): void {
        updates.forEach((cell) => {
            const color = this.get_color(cell)
            this.renderer.fill_rect(
                cell.x * size,
                cell.y * size,
                size,
                size,
                color
            ) 
        })
    }

    send_results(runtime: number): void {
        const id = get_solver_info_by_id(this.solver_id)?.id 
        const time_taken = format_time(runtime)
        const path_length = this.solver?.path_length ?? 0
        const expanded_cells = this.solver?.expanded_cells_count ?? 0
        publish("Results", `${id}/${path_length}/${expanded_cells}/${time_taken}`)
    }

}

export default Task