import type Cell from "./Cell"
import type Grid from "./Grid"
import type IPosition from "./IPosition"
import { MainType, SubType } from "./CellTypes"
import random from "../random/random"
import Updates from "./Updates"

class Worker {

    private readonly grid: Grid
    protected updates: Updates
    protected start_position: IPosition | undefined
    protected goal_position: IPosition | undefined

    private count_expanded_cells: number

    static manhatten_distance (start: IPosition, goal: IPosition): number {
        return Math.abs(start.x - goal.x) + Math.abs(start.y - goal.y)
    }

    constructor(grid: Grid) {
        this.grid = grid
        this.updates = new Updates()
        this.count_expanded_cells = 0
    }

    protected update_as_expanded (cell: Cell): void {
        this.count_expanded_cells = this.count_expanded_cells + 1
        cell.sub_type = SubType.EXPANDED
        this.updates.add(cell)
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
            cell.type = MainType.START
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
            cell.type = MainType.GOAL
        }
        return cell
    }
}

export default Worker