import {
    MAIN_TYPE,
    type MainType,
    SUB_TYPE
} from "../types/CellType"
import type Cell from "../classes/Cell"
import type CellStore from "../classes/CellStore"
import type Grid from "../classes/Grid"
import type Position from "../../global/Position"
import Worker from "../classes/Worker"

class Generator extends Worker {

    private carve_passage(
        start_cell: Cell,
        direction: Position,
        length: number
    ): Cell[] {
        const passage = [start_cell]
        for (let i = 0; i < length; i = i + 1) {
            const { x, y } = passage[passage.length - 1]
            const next_x = x + direction.x
            const next_y = y + direction.y

            // if moving into a cell of the outer ring, leave it as WALL amd stop
            if (next_x === 0 || next_x === this.get_grid().width - 1 ||
                next_y === 0 || next_y === this.get_grid().height - 1) {
                this.expand_position(next_x, next_y, MAIN_TYPE.WALL)
                break
            }
            
            const next_cell = this.get_grid().get_cell(next_x, next_y) as Cell
            passage.push(next_cell)
            this.expand_position(next_x, next_y, MAIN_TYPE.FLOOR)
            
            // set the walls to the sides of the path if not the start and end cell
            if (i < length - 1) {
                this.create_walls(next_cell, direction)
            }
            
        }
        // returns always a FLOOR tile
        // start_cell must be a FLOOR tile as well as last cell of passage
        return passage
    }

    private create_walls (cell: Cell, direction: Position): void {
        const WALL = MAIN_TYPE.WALL
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

    private expand_position (x: number, y: number, type: number): void {
        const cell = this.get_grid().get_cell(x, y)
        if (cell !== undefined && cell.sub_type !== SUB_TYPE.EXPANDED) {
            cell.type = type as MainType
            cell.sub_type = SUB_TYPE.EXPANDED
        }
    }

    private update_passage (passage: Cell[]): void {
        passage.forEach((cell, index) => {
            if (index === 0 || index === passage.length - 1) {
                cell.sub_type = SUB_TYPE.SEARCH
                this.store.add_unique(cell)
            } else {
                cell.sub_type = SUB_TYPE.EXPANDED
            }
            this.updates.add(cell)
        })
    }

    /** Creates a generator.
     * 
     * @param grid the grid to operate on. if not set then a grid with size 0 will be used as default
     * @param initial_type the type of cell used to fill the grid with. if not set the grid will be filled with the NONE type
     * @param store stores all the expanded and to be searched cells. if not set, it is initialized with the CellStore
     */
    constructor (id: number, grid?: Grid, initial_type?: MainType, store?: CellStore) {
        super(id, grid, store)
        this.get_grid().init(initial_type ?? MAIN_TYPE.NONE)
    }

    protected create_passage(current_cell: Cell, next_cell: Cell, length = 2): Cell[] {
        const passage = this.carve_passage(
            current_cell,
            {
              x: next_cell.x - current_cell.x,
              y: next_cell.y - current_cell.y
            },
            length
        )
        this.update_passage(passage)
        return passage
    }

    protected init_start_cell(
        start_cell: Cell,
        init_cell?: (cell: Cell) => void
    ): void {
        if (start_cell !== undefined) {
            start_cell.sub_type = SUB_TYPE.SEARCH
            this.store.add_unique(start_cell)
            if (init_cell instanceof Function) {
                init_cell(start_cell)
            }
        }
    }

    // TODO refactor
    set_start_position(_position: Position): void { /* void */ }
}

export default Generator