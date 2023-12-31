import Generator from "./Generator"
import type Grid from "../classes/Grid"
import { MAIN_TYPE } from "../types/CellType"

class EmptyMaze extends Generator {

    constructor(id: number, grid: Grid) {
        super(id, grid, MAIN_TYPE.WALL)

        const start_cell = grid.get_cell(1, 1)
        if (start_cell !== undefined) {
            this.store.add_unique(start_cell)
            while(!this.is_finished()) {
                const cell = this.store.remove(0)
                if (cell!== undefined) {
                    cell.type = MAIN_TYPE.FLOOR
                    grid.get_adjacent_neighbours(cell).forEach((neighbour) => {
                        if (neighbour.type === MAIN_TYPE.WALL
                            && neighbour.x > 0 && neighbour.x < grid.width - 1
                            && neighbour.y > 0 && neighbour.y < grid.height - 1
                        ) {
                            this.store.add_unique(neighbour)
                        }
                    })
                }
            }
        }
    }

    override is_finished(): boolean {
        return this.store.get_size() === 0
    }

}

export default EmptyMaze