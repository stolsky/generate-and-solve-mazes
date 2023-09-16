import CellStore from "../classes/CellStore"
import type Grid from "../classes/Grid"
import type IPosition from "../classes/IPosition"
import Solver from "./Solver"

/** Implementation of the Breadth-first search algorithm
 * 
 * Source: https://en.wikipedia.org/wiki/Breadth-first_search
 */
class BFS extends Solver {

    constructor(grid: Grid) {
        // Behaves as a FIFO queue
        super(grid, new CellStore())
    }

    override perform_step(): void {

        const current_cell = this.get_next_cell(0)
        if (current_cell === undefined) {
            return
        }

        this.get_adjacent_neighbours(current_cell).forEach((neighbour) => {
            this.discover_cell_from_source(neighbour, current_cell)
        })
    }

    set_start_position(position: IPosition): void {
        super.init_start_cell(super.create_start_cell(position))
    }

}

export default BFS