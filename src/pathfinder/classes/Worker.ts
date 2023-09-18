import {
    MAIN_TYPE,
    SUB_TYPE
} from "../types/CellType"
import Cell from "./Cell"
import type CellStore from "./CellStore"
import type Grid from "./Grid"
import type IPosition from "../types/IPosition"
import random from "../random/random"
import Updates from "./Updates"


class Worker {

    // TODO improve Indeces 
    // TODO add to options to config page for all algorithms that selects cells by index
    /*
        Newest/LAST
        Random
        
        Newest/Random, 75/25 split
        Newest/Random, 50/50 split
        Newest/Random, 25/75 split

        Oldest/FIRST
        Middle
        Newest/Oldest, 50/50 split
        Oldest/Random, 50/50 split

        FIBONACCI ??
    */
    static Index = {
        FIRST: 1,
        LAST: 2,
        RANDOM: 3
    } as const

    private readonly grid: Grid
    protected readonly store: CellStore
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

    constructor(grid: Grid, store: CellStore) {
        this.grid = grid
        this.store = store
        this.updates = new Updates()
        this._expanded_cells_count = 0
    }

    protected choose_index_by_type (type: number): number {
        // === Worker.Index.FIRST
        let index = 0
        if (type === Worker.Index.LAST) {
            index = this.store.get_size() - 1
        } else if (type === Worker.Index.RANDOM) {
            index = Math.floor(random(0, this.store.get_size() - 1))
        }
        return index
    }

    protected update_as_expanded (cell: Cell): void {
        this._expanded_cells_count = this._expanded_cells_count + 1
        cell.sub_type = SUB_TYPE.EXPANDED
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
        return this.store.get_size() === 0
    }

    perform_step(): void { /* void */ }

    // TODO refactor
    protected create_start_cell(position: IPosition): Cell {
        
        const { x, y } = position
        const cell = this.get_grid().get_cell(x, y) ?? new Cell(
            1,
            1,
            MAIN_TYPE.FLOOR
        )
        
        this.start_position = { x, y }
        cell.type = MAIN_TYPE.START

        this.updates.add(cell)
        return cell
    }

    // TODO refactor
    create_goal_cell(position: IPosition): Cell {

        const { x, y } = position
        const cell = this.get_grid().get_cell(x, y) ?? new Cell(
            this.get_grid().width - 2,
            this.get_grid().height - 2,
            MAIN_TYPE.FLOOR
        )

        this.goal_position = { x, y }
        cell.type = MAIN_TYPE.GOAL

        this.updates.add(cell)
        return cell
    }
}

export default Worker