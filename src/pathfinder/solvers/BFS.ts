import type Cell from "../classes/Cell"
import CellStore from "../classes/CellStore"
import type Grid from "../classes/Grid"
import type IPosition from "../classes/IPosition"
import Solver from "./Solver"
import { SubType } from "../classes/CellTypes"

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
        if (current_cell !== undefined) {
            this.get_adjacent_neighbours(current_cell).forEach((neighbour) => {
                neighbour.sub_type = SubType.SEARCH
                neighbour.predecessor = current_cell
                this.store.add_unique(neighbour)
                this.updates.add(neighbour)
            })
        }
        

    }

    override set_start_position(position: IPosition): Cell | undefined {
        const start_cell = super.set_start_position(position)
        if (start_cell !== undefined) {
            this.store.add_unique(start_cell)
        }
        return start_cell
    }

}

export default BFS