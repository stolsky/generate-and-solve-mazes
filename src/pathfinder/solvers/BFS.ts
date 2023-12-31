import type Position from "../../global/Position"
import Solver from "./Solver"

/** Implementation of the Breadth-first search algorithm
 * 
 * Source: https://en.wikipedia.org/wiki/Breadth-first_search
 */
class BFS extends Solver {

    override perform_step(): void {

        // behaves as a FIFO queue
        const current_cell = this.get_next_cell(0)
        if (current_cell === undefined) {
            return
        }

        this.get_adjacent_neighbours(current_cell).forEach((neighbour) => {
            this.discover_cell_from_source(neighbour, current_cell)
        })
    }

    override set_start_position(position: Position): void {
        super.init_start_cell(super.create_start_cell(position))
    }

}

export default BFS