import { MainType, SubType } from "../classes/CellTypes"
import type Cell from "../classes/Cell"
import type Grid from "../classes/Grid"
import type IPosition from "../classes/IPosition"
import Solver from "./Solver"
import SortedCellStore from "../classes/SortedCellStore"

/** Implementation of the Dijkstra algorithm
 * 
 * Source: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 */
class Dijkstra extends Solver {

    private readonly store: SortedCellStore

    constructor(grid: Grid) {
        super(grid)
        this.store = new SortedCellStore()
    }

    override is_finished(): boolean {
        return this.store.get_size() === 0
    }

    override perform_step(): void {
        super.perform_step()

        if (this.is_finished()) {
            return
        }

        const current_cell = this.store.remove(0) as Cell
        console.log(current_cell)
        if (current_cell.type === MainType.GOAL) {
            this.store.clear()
            this.construct_path(current_cell)
            return
        }
        
        current_cell.sub_type = SubType.EXPANDED
        this.updates.add(current_cell)

        this.get_von_neumann_neighbourhood(current_cell).forEach((neighbour) => {
            neighbour.f = current_cell.f + Solver.WEIGHT_OF_EDGE
            neighbour.sub_type = SubType.SEARCH
            neighbour.predecessor = current_cell
            this.store.add(neighbour)
            this.updates.add(neighbour)
        })

    }

    override set_start_position(position: IPosition): Cell | undefined {
        const start_cell = super.set_start_position(position)
        if (start_cell !== undefined) {
            start_cell.f = 0
            this.store.add(start_cell)
        }
        return start_cell
    }

}

export default Dijkstra