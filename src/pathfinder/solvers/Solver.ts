import { MainType, SubType } from "../classes/CellTypes"
import type Cell from "../classes/Cell"
import Worker from "../classes/Worker"

class Solver extends Worker {

    protected static WEIGHT_OF_EDGE = 1

    /** Calculates a Von-Neumann neighbourhood including all cells
     * that are floor tiles and not expanded.
     */
    protected get_von_neumann_neighbourhood (cell: Cell): Cell[] {
        return this.get_grid()
            .get_von_neumann_neighbourhood(cell)
            .filter((neighbour) => neighbour.type !== MainType.WALL
                && neighbour.sub_type !== SubType.EXPANDED)
    }

    construct_path (goal: Cell): void {
        let temp = goal
        temp.sub_type = SubType.PATH
        this.updates.add(temp)
        while (temp.predecessor !== undefined) {
            const previous_cell = temp.predecessor
            previous_cell.sub_type = SubType.PATH
            this.updates.add(previous_cell)
            temp = previous_cell
        }
    }

}

export default Solver