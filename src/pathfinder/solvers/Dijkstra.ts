import type Cell from "../classes/Cell"
import type Grid from "../classes/Grid"
import type IPosition from "../classes/IPosition"
import Solver from "./Solver"
import SortedCellStore from "../classes/SortedCellStore"
import { SubType } from "../classes/CellTypes"

/** Implementation of the Dijkstra algorithm
 * 
 * Source: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 */
class Dijkstra extends Solver {

    constructor(grid: Grid) {
        super(grid, new SortedCellStore())
    }

    override perform_step(): void {
        const current_cell = this.get_next_cell(0)
        if (current_cell !== undefined) {
            this.get_von_neumann_neighbourhood(current_cell).forEach((neighbour) => {
                neighbour.f = current_cell.f + Solver.WEIGHT_OF_EDGE
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
            start_cell.f = 0
            this.store.add_unique(start_cell)
        }
        return start_cell
    }

}

export default Dijkstra