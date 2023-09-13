import { MainType, SubType } from "../classes/CellTypes"
import type Cell from "../classes/Cell"
import Grid from "../classes/Grid"
import Worker from "../classes/Worker"

class Solver extends Worker {

    protected static WEIGHT_OF_EDGE = 1

    /** Calculates a Von-Neumann neighbourhood including all cells
     * that are floor tiles and not visited.
     */
    protected get_von_neumann_neighbourhood (cell: Cell): Cell[] {
        const neighbours: Cell[] = []
        const directions = Grid.calculate_directions(cell.x, cell.y)
        directions.forEach((direction) => {
            // add neighbour from direction
            const neighbour = this.get_grid().get_cell(direction.x, direction.y)
            if (neighbour !== undefined
                && neighbour.type !== MainType.WALL
                && neighbour.sub_type !== SubType.EXPANDED
            ) {
                neighbours.push(neighbour)
            }
        })
        return neighbours
    }

    construct_path(goal: Cell): void {
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