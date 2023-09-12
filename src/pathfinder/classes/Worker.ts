import type Cell from "./Cell"
import type Grid from "./Grid"
import type IPosition from "./IPosition"
import random from "../random/random"
import Updates from "./Updates"

class Worker {

    protected grid: Grid
    protected updates: Updates
    protected start_position: IPosition | undefined
    protected goal_position: IPosition | undefined

    constructor(grid: Grid) {
        this.grid = grid
        this.updates = new Updates()
    }

    // TODO make static and make use of "from" and "to"
    find_random_position(from?: number, to?: number): IPosition {
        const x = Math.floor(random(1, this.grid.width - 2))
        const y = Math.floor(random(1, this.grid.height - 2))
        return { x, y }
    }

    get_grid(): Grid {
        return this.grid
    }

    get_updates(): Cell[] {
        const updates = this.updates.get_all()
        this.updates.clear()
        return updates
    }

    is_finished(): boolean {
        return true
    }

    perform_step(): void { /* void */ }

    // TODO refactor
    set_start_position(position: IPosition): Cell | undefined {
        const { x, y } = position
        const cell = this.get_grid().get_cell(x, y)
        if (cell !== undefined) {
            this.updates.add(cell)
            // TODO only difference
            this.start_position = { x, y }
            cell.is_start = true
        }
        return cell
    }

    // TODO refactor
    set_goal_position(position: IPosition): Cell | undefined {
        const { x, y } = position
        const cell = this.get_grid().get_cell(x, y)
        if (cell !== undefined) {
            this.updates.add(cell)
            // TODO only difference
            this.goal_position = { x, y }
            cell.is_goal = true
        }
        return cell
    }
}

export default Worker