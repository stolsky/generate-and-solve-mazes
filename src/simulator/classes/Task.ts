import {
    MainType,
    SubType,
    TypeColor
} from "../../pathfinder/classes/CellTypes"
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
        let color = ""
        if (cell.type === MainType.WALL) {
            color = TypeColor.wall.color
        } else if (cell.type === MainType.START) {
            color = TypeColor.start.color
        } else if (cell.type === MainType.GOAL) {
            color = TypeColor.goal.color
        } else {
            color = this.get_sub_color(cell.sub_type)
            if (color.length === 0) {
                color = TypeColor.floor.color
            }
        }  
        return color
    }

    private get_sub_color(type: SubType): string {
        let color = ""
        if (type === SubType.EXPANDED) {
            color = TypeColor.expanded.color
        } else if (type === SubType.SEARCH) {
            color = TypeColor.search.color
        } else if (type === SubType.PATH) {
            color = TypeColor.path.color
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
            
            // TODO how to connect colors and objects
            // TODO how to be sure the following exist -> how the other States know which to set
            
        })
    }

    send_results(runtime: number): void {
        const short_name = get_solver_info_by_id(this.solver_id)?.short
        const time_taken = format_time(runtime)
        publish("Log", `${short_name} finished after ${time_taken} seconds.`)
    }

}

export default Task