import { MainType, SubType } from "../classes/CellTypes"
import type Cell from "../classes/Cell"
import CellStore from "../classes/CellStore"
import Grid from "../classes/Grid"
import Worker from "../classes/Worker"
import IPosition from "../classes/IPosition"

class Solver extends Worker {

    protected static WEIGHT_OF_EDGE = 1

    protected readonly store: CellStore
    private _path_length: number

    constructor(grid?: Grid, store?: CellStore) {
        super(grid ?? new Grid(0, 0))
        this.store = store ?? new CellStore()
        this._path_length = 0
    }

    protected construct_path (goal: Cell): void {
        let temp = goal
        temp.sub_type = SubType.PATH
        this.updates.add(temp)
        while (temp.predecessor !== undefined) {
            const previous_cell = temp.predecessor
            previous_cell.sub_type = SubType.PATH
            this.updates.add(previous_cell)
            temp = previous_cell
        }
        this._path_length = this.updates.get_all().length
    }

    protected discover_cell_from_source(cell: Cell, source: Cell): void {
        cell.predecessor = source
        cell.sub_type = SubType.SEARCH
        this.store.add_unique(cell)
        this.updates.add(cell)
    }

    /** Calculates a Von-Neumann neighbourhood including all cells
     * that are floor tiles and not expanded.
     */
    protected get_adjacent_neighbours (cell: Cell): Cell[] {
        return this.get_grid()
            .get_adjacent_neighbours(cell)
            .filter((neighbour) => neighbour.type !== MainType.WALL
                && neighbour.sub_type !== SubType.EXPANDED)
    }

    protected get_next_cell (index: number): Cell | undefined {
        if (this.is_finished()) {
            return undefined
        }
        const current_cell = this.store.remove(index) as Cell
        if (current_cell.type === MainType.GOAL) {
            this.store.clear()
            this.construct_path(current_cell)
            return undefined
        }
        this.update_as_expanded(current_cell)
        return current_cell
    }

    override is_finished(): boolean {
        return this.store.get_size() === 0
    }

    protected init_start_cell(
        start_cell: Cell,
        init_cell?: (cell: Cell) => void
    ): void {
        if (start_cell !== undefined) {
            this.store.add_unique(start_cell)
            if (init_cell instanceof Function) {
                init_cell(start_cell)
            }
        }
    }

    set_start_position (position: IPosition): void { /* void */ }

    get path_length (): number {
        return this._path_length
    }

}

export default Solver