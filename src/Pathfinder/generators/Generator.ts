import Cell from "../classes/Cell"
import IPosition from "../classes/IPosition"
import Worker from "../classes/Worker"
import random from "../random/random"

class Generator extends Worker {

    /** Shuffle an array using the Durstenfeld shuffle algorithm.
     * The array is shuffled in place.
     */
    protected static shuffle = (cells: Cell[]) => {
        for (let i = cells.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [cells[i], cells[j]] = [cells[j], cells[i]];
        }
    }

    private update_position = (x: number, y: number, type: number) => {
        let cell = this.grid.get_cell(x, y)
        if (cell && !cell.visited) {
            cell.type = type
            cell.visited = true
        }
    }

    private create_walls = (cell: Cell, direction: IPosition) => {
        const WALL = Cell.Type.WALL
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

    protected carve_passage = (
        start_cell: Cell,
        direction: IPosition,
        length: number
    ) => {
        if (!start_cell) {
            return []
        }
        const passage = [start_cell]
        let cell = start_cell
        const { FLOOR, WALL } = Cell.Type
        for (let i = 0; i < length; i = i + 1) {
            const x = cell.x + direction.x
            const y = cell.y + direction.y
            // if position is at the outer ring, set these cells always to WALL
            if (x === 0 || x === this.grid.width - 1 ||
                y === 0 || y === this.grid.height - 1) {
                this.update_position(x, y, WALL)
            } else {
                const next_cell = this.grid.get_cell(x, y)
                if (next_cell) {
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