import { MainType, SubType } from "../classes/CellTypes"
import type Cell from "../classes/Cell"
import CellStore from "../classes/CellStore"
import type Grid from "../classes/Grid"
import type IPosition from "../classes/IPosition"
import Solver from "./Solver"

/** Implementation of the Breadth-first search algorithm
 * 
 * Source: https://en.wikipedia.org/wiki/Breadth-first_search
 */
class BFS extends Solver {

    private readonly queue: CellStore

    constructor(grid: Grid) {
        super(grid)
        this.queue = new CellStore()
    }

    override is_finished(): boolean {
        return this.queue.get_size() === 0
    }

    override perform_step(): void {
        super.perform_step()

        if (this.is_finished()) {
            return
        }

        const current_cell = this.queue.remove(0) as Cell
        if (current_cell.type === MainType.GOAL) {
            this.queue.clear()
            this.construct_path(current_cell)
            return
        }
        
        current_cell.sub_type = SubType.EXPANDED
        this.updates.add(current_cell)

        this.get_von_neumann_neighbourhood(current_cell).forEach((neighbour) => {
            neighbour.sub_type = SubType.SEARCH
            neighbour.predecessor = current_cell
            this.queue.add(neighbour)
            this.updates.add(neighbour)
        })

    }

    override set_start_position(position: IPosition): Cell | undefined {
        const start_cell = super.set_start_position(position)
        if (start_cell !== undefined) {
            this.queue.add(start_cell)
        }
        return start_cell
    }

}

export default BFS