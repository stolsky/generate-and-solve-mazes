import type Cell from "../classes/Cell"
import CellStore from "../classes/CellStore"
import type Grid from "../classes/Grid"
import type IPosition from "../classes/IPosition"
import Solver from "./Solver"
import SortedCellStore from "../classes/SortedCellStore"
import { SubType } from "../classes/CellTypes"

/** Version of the A* algorithm using 1 as weight for all edges between nodes.
 *
 * Source: https://en.wikipedia.org/wiki/A*_search_algorithm
 */
class AStar extends Solver {

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

    // TODO add heuristic id as parameter to specify manhatten, euclidean or other heuristic method
    constructor(grid: Grid) {
        // list of cells that have been visited but not yet expanded
        // called open_set in the default algorithm
        super(grid, new SortedCellStore())
        this.closed_set = new CellStore()
    }

    override perform_step(): void {
        const current_cell = this.get_next_cell(0)
        if (current_cell !== undefined) {
            this.closed_set.add_unique(current_cell)
            this.get_adjacent_neighbours(current_cell).forEach((neighbour) => {
                // tentative_g_score is the distance from start to the neighbor through current
                const tentative_g_score = current_cell.g + Solver.WEIGHT_OF_EDGE
                if (tentative_g_score < neighbour.g) {
                    neighbour.predecessor = current_cell
                    neighbour.g = tentative_g_score
                    neighbour.f = tentative_g_score + this.heuristic(neighbour)
                    neighbour.sub_type = SubType.SEARCH
                    this.store.add_unique(neighbour)
                    this.updates.add(neighbour)
                }
            })
        }
    }

    override set_start_position(position: IPosition): Cell | undefined {
        const start_cell = super.set_start_position(position)
        if (start_cell !== undefined) {
            this.store.add_unique(start_cell)
            start_cell.g = 0
        }
        return start_cell
    }
}

export default AStar