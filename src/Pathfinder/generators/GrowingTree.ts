import Cell from "../../Pathfinder/classes/Cell";
import Grid from "../classes/Grid";
import IPosition from "../classes/IPosition";
import Store from "../classes/Store";
import Generator from "./Generator";

class GrowingTree extends Generator {

    private store: Store

    private add_cell_to_maze = (current_cell: Cell, next_cell: Cell): void => {
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
                this.store.add(cell)
            }
            this.updates.add(cell)
        })
    }

    private choose_index = (): number => {
        // newest cell
        const index = -1
        // random cell
        //const index = Math.floor(random(store.length - 1));
        // oldest cell
        //const index = 0;
        return index
    }

    private find_unvisited_neighbours = (x: number, y: number) => {
        const directions = Grid.calculate_directions(x, y)
        const look_ahead = Grid.calculate_look_ahead(x, y)
        const neighbours: Cell[] = [];
        directions.forEach((direction, index) => {
            const neighbour = this.grid.get_cell(
                direction.x,
                direction.y
            )
            const next_neighbour = this.grid.get_cell(
                look_ahead[index].x,
                look_ahead[index].y
            )
            if (neighbour && !neighbour.visited) {
                if (next_neighbour && !next_neighbour.visited) {
                    neighbours.push(neighbour);
                } else {
                    neighbour.type = Cell.Type.WALL
                    neighbour.visited = true
                }
            }
        })
        return neighbours
    }

    private find_next_cell = (cell: Cell, index: number) => {
        const unvisited_neighbours = this.find_unvisited_neighbours(
            cell.x,
            cell.y
        )
        let next_cell = null;
        if (unvisited_neighbours.length === 0) {
            const removed_cell = this.store.remove(index)
            if (removed_cell) {
                this.updates.add(removed_cell)
                if (removed_cell.is_start) {
                    removed_cell.is_start = false
                }
            }
        } else {
            Generator.shuffle(unvisited_neighbours)
            next_cell = unvisited_neighbours[0]
        }
        return next_cell
    }

    private select_current_cell = (): { cell: Cell | undefined, index: number } => {
        const index = this.choose_index()
        return { cell: this.store.get_cell(index), index }
    }

    constructor(grid: Grid) {
        super(grid)
        this.grid.init(Cell.Type.WALL)
        this.store = new Store()
    }

    public override is_finished(): boolean {
        return this.store.get_size() === 0
    }

    public override perform_step(): void {
        super.perform_step()
        const { cell, index } = this.select_current_cell()
        // if current cell is undefined than store must be empty and algorithm is finished
        if (cell) {
            const next_cell = this.find_next_cell(cell, index)
            if (next_cell) {
                this.add_cell_to_maze(cell, next_cell)
            }
        }
    }

    public override set_start_position(position: IPosition) {
        const { x, y } = position
        
        // by starting at odd coordinates, there will be a wall outside automatically 
        if (x % 2 === 0) {
            position.x = x - 1;
        }
        if (y % 2 === 0) {
            position.y = y - 1;
        }
        
        const start_cell = super.set_start_position(position)
        if (start_cell) {
            start_cell.type = Cell.Type.FLOOR
            start_cell.visited = true
            this.store.add(start_cell)
            return start_cell
        }
    }

}

export default GrowingTree