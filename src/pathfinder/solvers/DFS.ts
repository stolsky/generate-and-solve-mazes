import CellStore from "../classes/CellStore"
import type Grid from "../classes/Grid"
import type IPosition from "../classes/IPosition"
import Solver from "./Solver"

/** Implementation of the Depth-first search algorithm
 * 
 * Source: https://en.wikipedia.org/wiki/Depth-first_search
 */
class DFS extends Solver {

    constructor(grid: Grid) {
        // behaves as a stack
        super(grid, new CellStore())
    }

    override perform_step(): void {
        const current_cell = this.get_next_cell(-1)
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

export default DFS