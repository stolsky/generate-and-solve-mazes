import Cell from "../../pathfinder/classes/Cell"
import type RenderingContextWrapper from "../ui/components/ContextWrapper"
import type Solver from "../../pathfinder/solvers/Solver"

type RenderOptions = Record<string, Record<string, string>>;

// TODO create PathfinderTask extend Task
class Task {

    private options: RenderOptions
    private readonly renderer: RenderingContextWrapper
    private readonly solver_id: number
    private _solver: Solver | undefined

    constructor(renderer: RenderingContextWrapper, solver_id: number) {
        this.options = { colors: {} }
        this.renderer = renderer
        this.solver_id = solver_id
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

            let fill_color = ""
            let stroke_color = ""
            
            // TODO how to connect colors and objects
            // TODO how to be sure the following exist -> how the other States know which to set
            const colors = this.options.colors
            if (cell.type === Cell.Type.FLOOR) {
                if (colors.start !== undefined && cell.is_start) {
                    fill_color = colors.start
                } else if (colors.goal !== undefined && cell.is_goal) {
                    fill_color = colors.goal
                } else if (colors.visited !== undefined && cell.visited) {
                    fill_color = colors.visited
                } else if (colors.floor !== undefined) {
                    fill_color = colors.floor
                }
            } else if (colors.wall !== undefined && cell.type === Cell.Type.WALL) {
                fill_color = colors.wall
            }
    
            if (colors.stored !== undefined && cell.stored) {
                stroke_color = colors.stored
            } else {
                stroke_color = fill_color
            }
        
            this.renderer.fill_rect(
                cell.x * size,
                cell.y * size,
                size,
                size,
                fill_color
            )

            const half_size = size >>> 1
            this.renderer.fill_circle(
                cell.x * size + half_size,
                cell.y * size + half_size,
                half_size - 2,
                stroke_color
            )
            
        })
    }

    set_render_options(options: RenderOptions): void {
        Object.keys(options).forEach((key) => {
            // merge options
            this.options[key] = { ...this.options[key], ...options[key] }
        })
    }

}

export default Task