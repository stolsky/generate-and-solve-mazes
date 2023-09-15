import {
    MainType,
    SubType
} from "./CellTypes"
import type Cell from "./Cell"
import type Grid from "./Grid"
import type IPosition from "./IPosition"
import random from "../random/random"
import Updates from "./Updates"

class Worker {

    private readonly grid: Grid
    protected updates: Updates
    protected start_position: IPosition | undefined
    protected goal_position: IPosition | undefined

    private _expanded_cells_count: number

    static euclidean_distance (start: IPosition, goal: IPosition): number {
        return Math.sqrt((goal.x - start.x) ** 2 + (goal.y - start.y) ** 2)
    }
    
    static manhatten_distance (start: IPosition, goal: IPosition): number {
        return Math.abs(start.x - goal.x) + Math.abs(start.y - goal.y)
    }

    constructor(grid: Grid) {
        this.grid = grid
        this.updates = new Updates()
        this._expanded_cells_count = 0
    }

    protected update_as_expanded (cell: Cell): void {
        this._expanded_cells_count = this._expanded_cells_count + 1
        cell.sub_type = SubType.EXPANDED
        this.updates.add(cell)
    }

    get expanded_cells_count (): number {
        return this._expanded_cells_count
    }

    // TODO make static and make use of "from" and "to"
    find_random_position(from?: number, to?: number): IPosition {
        const x = Math.floor(random(1, this.get_grid().width - 2))
        const y = Math.floor(random(1, this.get_grid().height - 2))
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