import {
    MainType,
    SubType
} from "../classes/CellTypes"
import type Cell from "../classes/Cell"
import CellStore from "../classes/CellStore"
import type Grid from "../classes/Grid"
import type IPosition from "../classes/IPosition"
import Solver from "./Solver"
import SortedCellStore from "../classes/SortedCellStore"


/** Version of the A* algorithm using 1 as weight for all edges between nodes.
 *
 * Source: https://en.wikipedia.org/wiki/A*_search_algorithm
 */
class AStar extends Solver {

    /** list of cells that have been visited but not yet expanded */
    private readonly open_set: SortedCellStore
    /** list containing all completely expanded/evaluated cells */
    private readonly closed_set: CellStore
    
    /** Calculates the manhatten distance
     * 
     * for other heuristics visit - https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
     */
    private heuristic (start: Cell): number {
        return Solver.manhatten_distance(
            {
                x: start.x,
                y: start.y
            },
            {
                x: this.goal_position?.x ?? 0,
                y: this.goal_position?.y ?? 0
            }
        )
    }

    constructor(grid: Grid) {
        super(grid)
        this.open_set = new SortedCellStore()
        this.closed_set = new CellStore()
    }

    override is_finished(): boolean {
        return this.open_set.get_size() === 0
    }

    override perform_step(): void {

        if (this.is_finished()) {
            return
        }

        // open_set is a sorted cell store, which is sorted from lowest to highest
        const current_cell = this.open_set.remove(0) as Cell
        if (current_cell.type === MainType.GOAL) {
            this.open_set.clear()
            this.construct_path(current_cell)
            return
        }

        this.update_as_expanded(current_cell)
        this.closed_set.add_unique(current_cell)

        this.get_von_neumann_neighbourhood(current_cell).forEach((neighbour) => {

            // tentative_g_score is the distance from start to the neighbor through current
            const tentative_g_score = current_cell.g + Solver.WEIGHT_OF_EDGE
            if (tentative_g_score < neighbour.g) {
                neighbour.predecessor = current_cell
                neighbour.g = tentative_g_score
                neighbour.f = tentative_g_score + this.heuristic(neighbour)
                neighbour.sub_type = SubType.SEARCH
                this.open_set.add_unique(neighbour)
                this.updates.add(neighbour)
            }

        })
    }

    override set_start_position(position: IPosition): Cell | undefined {
        const start_cell = super.set_start_position(position)
        if (start_cell !== undefined) {
            this.open_set.add_unique(start_cell)
            start_cell.g = 0
        }
        return start_cell
    }
}

export default AStar