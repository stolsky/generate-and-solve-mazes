import { MainType, SubType } from "../classes/CellTypes"
import type Cell from "../classes/Cell"
import type IPosition from "../classes/IPosition"
import Worker from "../classes/Worker"

class Generator extends Worker {

    private update_position(x: number, y: number, type: number): void {
        const cell = this.get_grid().get_cell(x, y)
        if (cell !== undefined && cell.sub_type !== SubType.EXPANDED) {
            cell.type = type
            cell.sub_type = SubType.EXPANDED
        }
    }

    private create_walls(cell: Cell, direction: IPosition): void {
        const WALL = MainType.WALL
        const x = cell.x
        const y = cell.y
        // set upper and lower wall to visited cell
        if (direction.x !== 0) {
            this.update_position(x, y - 1, WALL)
            this.update_position(x, y + 1, WALL)
        }
        // set left and right wall to visited cell
        if (direction.y !== 0) {
            this.update_position(x - 1, y, WALL)
            this.update_position(x + 1, y, WALL)
        }
    }

    protected carve_passage(
        start_cell: Cell,
        direction: IPosition,
        length: number
    ): Cell[] {
        if (start_cell === undefined) {
            return []
        }
        const passage = [start_cell]
        let cell = start_cell
        const { FLOOR, WALL } = MainType
        for (let i = 0; i < length; i = i + 1) {
            const x = cell.x + direction.x
            const y = cell.y + direction.y
            // if position is at the outer ring, set these cells always to WALL
            if (x === 0 || x === this.get_grid().width - 1 ||
                y === 0 || y === this.get_grid().height - 1) {
                this.update_position(x, y, WALL)
            } else {
                const next_cell = this.get_grid().get_cell(x, y)
                if (next_cell !== undefined) {
                    this.update_position(x, y, FLOOR)
                    passage.push(next_cell)
                    cell = next_cell
                    // set walls to the sides of carving direction
                    if (i < length - 1) {
                        this.create_walls(next_cell, direction)
                    }
                }
            }
        }
        // returns always a FLOOR tile
        // start_cell must be a FLOOR tile as well as last cell of passage
        return passage
    }
}

export default Generator