import RenderingContextWrapper from "../ui/components/ContextWrapper"

import Solver from "../../Pathfinder/solvers/Solver"
import Cell from "../../Pathfinder/classes/Cell"

import { publish } from "../Broker"

type RenderOptions = {
    colors: {
        [key: string]: string
    }
}

// TODO create PathfinderTask extend Task
class Task {

    private options: RenderOptions
    private context: RenderingContextWrapper
    private solver_id: number
    private _solver: Solver | undefined

    private set_color = (key: string, value?: string) => {
        if (value) {
            const previous_value = this.options.colors[key]
            if (previous_value && previous_value !== value) {
                publish("Remove_legend_item", key)
            }
            this.options.colors[key] = value
            publish("Add_legend_item", `${key}:${value}`)
        }
    }

    constructor(context: RenderingContextWrapper, solver_id: number) {
        this.options = { colors: {} } as RenderOptions
        this.context = context
        this.solver_id = solver_id
    }

    get solver(): Solver | undefined {
        return this._solver
    }

    set solver(solver: Solver) {
        this._solver = solver
    }

    get_solver_id() {
        return this.solver_id
    }

    render(updates: Cell[], size: number) {
        updates.forEach((cell) => {

            let fill_color = ""
            let stroke_color = ""
            
            // TODO how to connect colors and objects
            // TODO how to be sure the following exist -> how the other States know which to set
            const colors = this.options.colors
            if (cell.type === Cell.Type.FLOOR) {
                if (colors.start && cell.is_start) {
                    fill_color = colors.start
                } else if (colors.goal && cell.is_goal) {
                    fill_color = colors.goal
                } else if (colors.visited && cell.visited) {
                    fill_color = colors.visited
                } else if (colors.floor) {
                    fill_color = colors.floor
                }
            } else if (colors.wall && cell.type === Cell.Type.WALL) {
                fill_color = colors.wall
            }
    
            if (colors.stored && cell.stored) {
                stroke_color = colors.stored
            } else {
                stroke_color = fill_color
            }
        
            this.context.fillRect(
                cell.x * size,
                cell.y * size,
                size,
                size,
                fill_color
            )
            this.context.fillRect(
                cell.x * size + 1,
                cell.y * size + 1,
                size - 2,
                size - 2,
                stroke_color
            )
            
        })
    }

    set_render_options(options: RenderOptions) {
        const { colors } = options
        for (const key in colors) {
            this.set_color(key, colors[key])
        }
    }

}

export default Task