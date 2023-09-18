import {
    get_main_color_from_type,
    get_sub_color_from_type
} from "../../pathfinder/types/TypeColors"
import type Cell from "../../pathfinder/classes/Cell"
import type ContextWrapper from "../ui/components/ContextWrapper"
import type Solver from "../../pathfinder/solvers/Solver"

// TODO create PathfinderTask extend Task
class Task {

    private readonly renderer: ContextWrapper
    private readonly solver_id: number
    private _solver: Solver | undefined
    private _is_finished: boolean

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
            const main_color = get_main_color_from_type(cell.type)
            this.renderer.fill_rect(
                cell.x * size,
                cell.y * size,
                size,
                size,
                main_color
            )

            const sub_color = get_sub_color_from_type(cell.sub_type)
            if (sub_color !== undefined) {
                this.renderer.fill_rect(
                    cell.x * size + 2,
                    cell.y * size + 2,
                    size - 4,
                    size - 4,
                    sub_color
                )
            }
            
        })
    }

}

export default Task