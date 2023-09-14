import {
    MainType,
    SubType
} from "../classes/CellTypes"
import type Cell from "../classes/Cell"
import CellStore from "../classes/CellStore"
import Generator from "./Generator"
import Grid from "../classes/Grid"
import type IPosition from "../classes/IPosition"
import { shuffle } from "../utilities"

class GrowingTree extends Generator {

    private readonly store: CellStore

    private add_cell_to_maze(current_cell: Cell, next_cell: Cell): void {
        const passage = this.carve_passage(
            current_cell,
            {
              x: next_cell.x - current_cell.x,
              y: next_cell.y - current_cell.y
            },
            2
        )
        passage.forEach((cell, index) => {
            if (index === 0 || index === passage.length - 1) {
                cell.sub_type = SubType.SEARCH
                this.store.add_unique(cell)
            } else {
                cell.sub_type = SubType.EXPANDED
            }
            this.updates.add(cell)
        })
    }

    private choose_index(): number {
        // newest cell
        const index = -1
        // random cell
        // const index = Math.floor(random(store.length - 1));
        // oldest cell
        // const index = 0;
        return index
    }

    private find_unvisited_neighbours(x: number, y: number): Cell[] {
        const directions = Grid.calculate_von_neumann_directions(x, y)
        const look_ahead = Grid.calculate_look_ahead(x, y)
        const neighbours: Cell[] = [];
        directions.forEach((direction, index) => {
            const neighbour = this.get_grid().get_cell(
                direction.x,
                direction.y
            )
            const next_neighbour = this.get_grid().get_cell(
                look_ahead[index].x,
                look_ahead[index].y
            )
            if (neighbour!== undefined && neighbour.sub_type !== SubType.EXPANDED) {
                if (next_neighbour!== undefined
                    && next_neighbour.sub_type !== SubType.SEARCH
                    && next_neighbour.sub_type !== SubType.EXPANDED
                ) {
                    neighbours.push(neighbour)
                } else {
                    neighbour.type = MainType.WALL
                    neighbour.sub_type = SubType.EXPANDED
                }
            }
        })
        return neighbours
    }

    private find_next_cell(cell: Cell, index: number): Cell | undefined {
        const unvisited_neighbours = this.find_unvisited_neighbours(
            cell.x,
            cell.y
        )
        let next_cell
        if (unvisited_neighbours.length === 0) {
            const removed_cell = this.store.remove(index)
            if (removed_cell !== undefined) {
                removed_cell.sub_type = SubType.EXPANDED
                this.updates.add(removed_cell)
            }
        } else {
            shuffle(unvisited_neighbours)
            next_cell = unvisited_neighbours[0]
        }
        return next_cell
    }

    private select_current_cell(): { cell: Cell | undefined, index: number } {
        const index = this.choose_index()
        return { cell: this.store.get_cell(index), index }
    }

    constructor(grid: Grid) {
        super(grid)
        this.get_grid().init(MainType.WALL)
        this.store = new CellStore()
    }

    override is_finished(): boolean {
        return this.store.get_size() === 0
    }

    override perform_step(): void {
        const { cell, index } = this.select_current_cell()
        // if current cell is undefined than store must be empty and algorithm is finished
        if (cell!== undefined) {
            const next_cell = this.find_next_cell(cell, index)
            if (next_cell!== undefined) {
                this.add_cell_to_maze(cell, next_cell)
            }
        }
    }

    override set_start_position(position: IPosition): Cell | undefined {
        const { x, y } = position
        
        // by starting at odd coordinates, there will be a wall outside automatically 
        if (x % 2 === 0) {
            position.x = x - 1;
        }
        if (y % 2 === 0) {
            position.y = y - 1;
        }
        
        const start_cell = super.set_start_position(position)
        if (start_cell !== undefined) {
            start_cell.type = MainType.START
            // start_cell.sub_type = SubType.EXPANDED
            start_cell.sub_type = SubType.SEARCH
            this.store.add_unique(start_cell)
        }
        return start_cell
    }

}

export default GrowingTree