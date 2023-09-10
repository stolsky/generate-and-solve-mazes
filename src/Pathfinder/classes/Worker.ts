import Grid from "../classes/Grid"
import IPosition from "../classes/IPosition"
import random from "../random/random"
import Updates from "./Updates"

class Worker {

    protected grid: Grid
    protected updates: Updates
    protected start_position: IPosition | undefined
    protected end_position: IPosition | undefined

    constructor(grid: Grid) {
        this.grid = grid
        this.updates = new Updates()
    }

    public find_random_position(from?: number, to?: number): IPosition {
        const x = Math.floor(random(1, this.grid.width - 2))
        const y = Math.floor(random(1, this.grid.height - 2))
        return { x, y }
    }

    public get_grid() {
        return this.grid
    }

    public get_updates() {
        const updates = this.updates.get_all()
        this.updates.clear()
        return updates
    }

    public is_finished(): boolean {
        return true
    }

    public perform_step() { /* void */ }

    public set_start_position(position: IPosition) {
        const { x, y } = position
        const cell = this.get_grid().get_cell(x, y)
        if (cell) {
            this.updates.add(cell)
            this.start_position = { x, y }
            cell.is_start = true
            return cell
        }
    }

    public set_goal_position(position: IPosition) {
        const { x, y } = position
        const cell = this.get_grid().get_cell(x, y)
        if (cell) {
            this.updates.add(cell)
            this.end_position = { x, y }
            cell.is_goal = true
            return cell
        }
    }
}

export default Worker