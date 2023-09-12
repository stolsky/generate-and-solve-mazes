import Cell from "../classes/Cell"
import CellStore from "../classes/CellStore"
import Grid from "../classes/Grid"
import type IPosition from "../classes/IPosition"
import Solver from "./Solver"
import SortedCellStore from "../classes/SortedCellStore"

/** Version of the A* algorithm using 1 as weight for all edges between nodes. */
class AStar extends Solver {

    private static readonly WEIGHT_OF_EDGE = 1

    // TODO use sorted_open_set
    // add to sorted open set // insert sort
    /** list of cells that have been visited but not yet expanded */
    private readonly open_set: SortedCellStore
    /** list containing all completely expanded/evaluated cells */
    private readonly closed_set: CellStore

    /** Calculates a Von-Neumann neighbourhood including all cells
     * that are floor tiles and not visited.
     */
    private get_von_neumann_neighbourhood (cell: Cell): Cell[] {
        const neighbours: Cell[] = []
        const directions = Grid.calculate_directions(cell.x, cell.y)
        directions.forEach((direction) => {
            // add neighbour from direction
            const neighbour = this.grid.get_cell(direction.x, direction.y)
            if (neighbour !== undefined && neighbour.type === Cell.Type.FLOOR && !neighbour.visited) {
                neighbours.push(neighbour)
            }
        })
        return neighbours
    }
    
    /** Calculates the manhatten distance
     * 
     * for other heuristics visit - https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
     */
    private heuristic (start: Cell): number {
        const goal_x = this.goal_position?.x ?? 0
        const goal_y = this.goal_position?.y ?? 0
        return Math.abs(start.x - goal_x) + Math.abs(start.y - goal_y)
    }

    constructor(grid: Grid) {
        super(grid)
        this.open_set = new SortedCellStore()
        this.closed_set = new CellStore()
        this.path = new CellStore()
    }

    override is_finished(): boolean {
        return this.open_set.get_size() === 0
    }

    override perform_step(): void {
        super.perform_step()

        if (this.is_finished()) {
            return
        }

        // open_set is a sorted cell store, which is sorted from lowest to highest
        const current_cell = this.open_set.remove(0) as Cell
        if (current_cell.is_goal) {
            this.path.add(current_cell)
            this.open_set.clear()
            return
        }

        current_cell.visited = true
        this.closed_set.add(current_cell)
        this.updates.add(current_cell)

        this.get_von_neumann_neighbourhood(current_cell).forEach((neighbour) => {

            // tentative_g_score is the distance from start to the neighbor through current
            const tentative_g_score = current_cell.g + AStar.WEIGHT_OF_EDGE
            if (tentative_g_score < neighbour.g) {
                current_cell.previous_cell = neighbour
                neighbour.g = tentative_g_score
                neighbour.f = tentative_g_score + this.heuristic(neighbour)
                if (!this.open_set.has(neighbour)) {
                    this.open_set.add(neighbour)
                    this.updates.add(neighbour)
                }
            }

            // let is_better_path = false;
            // if (this.open_set.includes(neighbour)) {
            //     if (tentative_g_score < neighbour.g) {
            //         
            //         is_better_path = true;
            //     }
            // } else {
            //     neighbour.g = tentative_g_score;
            //     is_better_path = true;
            //     this.open_set.push(neighbour);
            // }

            // if (is_better_path) {
            //     neighbour.f = neighbour.g + neighbour.h;
            //     neighbour.previous = current_cell;

                // neighbor.g = possibleG;
                // neighbor.h = heuristic(neighbor, end);
                // neighbor.f = neighbor.g + neighbor.h;
                // neighbor.parent = current;

            // }

            
        })
    }

    override set_start_position(position: IPosition): Cell | undefined {
        const start_cell = super.set_start_position(position)
        if (start_cell !== undefined) {
            this.open_set.add(start_cell)
            start_cell.stored = true
            start_cell.g = 0
        }
        return start_cell
    }
}

export default AStar