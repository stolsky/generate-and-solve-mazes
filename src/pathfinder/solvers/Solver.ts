import { MainType, SubType } from "../classes/CellTypes"
import type Cell from "../classes/Cell"
import type CellStore from "../classes/CellStore"
import type Grid from "../classes/Grid"
import Worker from "../classes/Worker"

class Solver extends Worker {

    protected static WEIGHT_OF_EDGE = 1

    protected readonly store: CellStore

    constructor(grid: Grid, store: CellStore) {
        super(grid)
        this.store = store
    }

    /** Calculates a Von-Neumann neighbourhood including all cells
     * that are floor tiles and not expanded.
     */
    protected get_von_neumann_neighbourhood (cell: Cell): Cell[] {
        return this.get_grid()
            .get_von_neumann_neighbourhood(cell)
            .filter((neighbour) => neighbour.type !== MainType.WALL
                && neighbour.sub_type !== SubType.EXPANDED)
    }

    protected get_next_cell (index: number): Cell | undefined {

        if (this.is_finished()) {
            return undefined
        }

        // open_set is a sorted cell store, which is sorted from lowest to highest
        const current_cell = this.store.remove(index) as Cell
        if (current_cell.type === MainType.GOAL) {
            this.store.clear()
            this.construct_path(current_cell)
            return undefined
        }

        this.update_as_expanded(current_cell)

        return current_cell
    }

    construct_path (goal: Cell): void {
        let temp = goal
        temp.sub_type = SubType.PATH
        this.updates.add(temp)
        while (temp.predecessor !== undefined) {
            const previous_cell = temp.predecessor
            previous_cell.sub_type = SubType.PATH
            this.updates.add(previous_cell)
            temp = previous_cell
        }
    }

    override is_finished(): boolean {
        return this.store.get_size() === 0
    }

}

export default Solver