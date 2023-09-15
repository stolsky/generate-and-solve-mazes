import CellStore from "../classes/CellStore"
import Generator from "./Generator"
import type Grid from "../classes/Grid"
import { MainType } from "../classes/CellTypes"

class EmptyMaze extends Generator {

    private readonly store: CellStore

    constructor(grid: Grid) {
        super(grid)
        this.get_grid().init(MainType.WALL)
        this.store = new CellStore()
        const start_cell = this.get_grid().get_cell(1, 1)
        if (start_cell !== undefined) {
            this.store.add_unique(start_cell)
            while(!this.is_finished()) {
                const cell = this.store.remove(0)
                if (cell!== undefined) {
                    cell.type = MainType.FLOOR
                    const grid = this.get_grid()
                    grid.get_adjacent_neighbours(cell).forEach((neighbour) => {
                        if (neighbour.type === MainType.WALL
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