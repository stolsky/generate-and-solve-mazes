import {
    MAIN_TYPE,
    SUB_TYPE
} from "../types/CellType"
import type Cell from "../classes/Cell"
import Generator from "./Generator"
import type Grid from "../classes/Grid"
import type Position from "../../global/Position"
import { shuffle } from "../utilities"
import Worker from "../classes/Worker"

/** Implementation of the Growing Tree algorithm to generate mazes.
 * 
 * Resource: https://weblog.jamisbuck.org/2011/1/27/maze-generation-growing-tree-algorithm.html
 */
class GrowingTree extends Generator {

    private readonly index_type: number

    private get_random_cell (cells: Cell[]): Cell {
        shuffle(cells)
        return cells[0]
    }

    private get_unvisited_neighbours (cell: Cell): Cell[] {
        return this.get_grid()
            .get_adjacent_neighbours(cell)
            .filter((neighbour) => neighbour.sub_type !== SUB_TYPE.EXPANDED
                && this.is_next_cell_available(cell, neighbour))
    }

    private is_next_cell_available (start: Cell, goal: Cell): boolean {
        const x = goal.x * 2 - start.x
        const y = goal.y * 2 - start.y
        const look_ahead = this.get_grid().get_cell(x, y)
        return (look_ahead !== undefined
            && look_ahead.sub_type !== SUB_TYPE.SEARCH
            && look_ahead.sub_type !== SUB_TYPE.EXPANDED
        )
    }

    private remove_cell (index: number): void {
        const removed_cell = this.store.remove(index)
        if (removed_cell !== undefined) {
            removed_cell.sub_type = SUB_TYPE.EXPANDED
            this.updates.add(removed_cell)
        }
    }

    constructor(id: number, grid: Grid, index_type: number = Worker.Index.LAST) {
        super(id, grid, MAIN_TYPE.WALL)
        this.index_type = index_type
    }

    override perform_step(): void {

        const current_index = this.choose_index_by_type(this.index_type)
        const current_cell = this.store.get_cell(current_index)

        // if current cell is undefined than store must be empty and algorithm is finished
        if (current_cell === undefined) {
            return
        }

        const neighbours = this.get_unvisited_neighbours(current_cell)
        if (neighbours.length === 0) {
            this.remove_cell(current_index)
            return
        }

        this.create_passage(
            current_cell,
            this.get_random_cell(neighbours)
        )
    }

    override set_start_position(position: Position): void {
        super.init_start_cell(
            super.create_start_cell(position)
        )
    }

}

export default GrowingTree