import {
    MainType,
    SubType
} from "../classes/CellTypes"
import type Cell from "../classes/Cell"
import type CellStore from "../classes/CellStore"
import type Grid from "../classes/Grid"
import type IPosition from "../classes/IPosition"
import Worker from "../classes/Worker"

class Generator extends Worker {

    protected readonly store: CellStore

    private expand_position (x: number, y: number, type: number): void {
        const cell = this.get_grid().get_cell(x, y)
        if (cell !== undefined && cell.sub_type !== SubType.EXPANDED) {
            cell.type = type
            cell.sub_type = SubType.EXPANDED
        }
    }

    private create_walls (cell: Cell, direction: IPosition): void {
        const WALL = MainType.WALL
        const x = cell.x
        const y = cell.y
        // set upper and lower wall to visited cell
        if (direction.x !== 0) {
            this.expand_position(x, y - 1, WALL)
            this.expand_position(x, y + 1, WALL)
        }
        // set left and right wall to visited cell
        if (direction.y !== 0) {
            this.expand_position(x - 1, y, WALL)
            this.expand_position(x + 1, y, WALL)
        }
    }

    constructor (grid: Grid, initial_type: MainType, store: CellStore) {
        super(grid)
        this.get_grid().init(initial_type)
        this.store = store
    }

    protected carve_passage(
        start_cell: Cell,
        direction: IPosition,
        length: number
    ): Cell[] {
        if (start_cell === undefined) {
            return []
        }
    
        const { FLOOR, WALL } = MainType
        const passage = [start_cell]
        for (let i = 0; i < length; i = i + 1) {
            const { x, y } = passage[passage.length - 1]
            const next_x = x + direction.x
            const next_y = y + direction.y
            // if moving into a cell of the outer ring, leave it as WALL amd stop
            if (next_x === 0 || next_x === this.get_grid().width - 1 ||
                next_y === 0 || next_y === this.get_grid().height - 1) {
                this.expand_position(next_x, next_y, WALL)
                break
            }
            
            const next_cell = this.get_grid().get_cell(next_x, next_y)

            // if next cell not exists (should not be possible)
            if (next_cell === undefined) {
                break
            }

            passage.push(next_cell)
            this.expand_position(next_x, next_y, FLOOR)
            
            // set the walls to the sides of the path if not the start and end cell
            if (i < length - 1) {
                this.create_walls(next_cell, direction)
            }
            
        }
        // returns always a FLOOR tile
        // start_cell must be a FLOOR tile as well as last cell of passage
        return passage
    }

    protected init_start_cell(
        start_cell: Cell,
        init_cell?: (cell: Cell) => void
    ): void {
        if (start_cell !== undefined) {
            start_cell.sub_type = SubType.SEARCH
            this.store.add_unique(start_cell)
            if (init_cell instanceof Function) {
                init_cell(start_cell)
            }
        }
    }
}

export default Generator