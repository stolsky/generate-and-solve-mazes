import type Cell from "../classes/Cell"
import type Grid from "../classes/Grid"
import type Position from "../../global/Position"
import Solver from "./Solver"
import SortedCellStore from "../classes/SortedCellStore"

/** Implementation of the Dijkstra algorithm
 * 
 * Source: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 */
class Dijkstra extends Solver {

    constructor(id: number, grid: Grid) {
        super(id, grid, new SortedCellStore())
    }

    override perform_step(): void {

        const current_cell = this.get_next_cell(0)
        if (current_cell === undefined) {
            return
        }

        this.get_adjacent_neighbours(current_cell).forEach((neighbour) => {
            neighbour.f = current_cell.f + Solver.WEIGHT_OF_EDGE
            this.discover_cell_from_source(neighbour, current_cell)
        })
        
    }

    override set_start_position(position: Position): void {
        super.init_start_cell(
            super.create_start_cell(position),
            (cell: Cell) => { cell.f = 0 }
        )
    }

}

export default Dijkstra