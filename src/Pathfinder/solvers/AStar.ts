import Cell from "../classes/Cell";
import Grid from "../classes/Grid";
import Store from "../classes/Store";
import Solver from "./Solver";

class AStar extends Solver {

    private open_set: Store

    private find_lowest_index = () => {
        // let lowest_index = 0;
        // const size = this.open_set.get_size()
        // for (let i = 0; i < size; i = i + 1) {
        //     const current_cell = this.open_set.get_cell(i)
        //     const lowest_cell = this.open_set.get_cell(lowest_index)
        //     if (this.open_set.get_cell(i).f < array[lowest_index].f) {
        //         lowest_index = i;
        //     }
        // }
        // return lowest_index
    }
    
    private get_von_neumann_neighbourhood = (cell: Cell) => {

        // const neighbours: Cell[] = []
        // const { x, y } = cell
    
        // // add top neighbour
        // const top_neighbour_index = j - 1;
        // if (top_neighbour_index > -1) {
        //     neighbours.push(array2d[i][top_neighbour_index]);
        // }
    
        // // add right neigbour
        // const right_neighbour_index = i + 1;
        // if (right_neighbour_index < array2d.length) {
        //     neighbours.push(array2d[right_neighbour_index][j]);
        // }
    
        // // add bottom neighbour
        // const bottom_neighbour_index = j + 1;
        // if (bottom_neighbour_index < array2d[i].length) {
        //     neighbours.push(array2d[i][bottom_neighbour_index]);
        // }
    
        // // add left neigbour
        // const left_neighbour_index = i - 1;
        // if (left_neighbour_index > -1) {
        //     neighbours.push(array2d[left_neighbour_index][j]);
        // }
    
        // return neighbours
    };
    
    // manhatten distance
    // const heuristic = (start, end) => Math.abs(start.i - end.i) + Math.abs(start.j - end.j);

    constructor(grid: Grid) {
        super(grid)
        this.open_set = new Store()
        if (this.start_position) {
            const start_cell = this.get_grid().get_cell(
                this.start_position.x,
                this.start_position.y
            )
            if (start_cell) {
                this.open_set.add(start_cell)
                start_cell.stored = true
            }
        }
    }

    public override is_finished(): boolean {
        return this.open_set.get_size() === 0
    }

    public override perform_step(): void {
        super.perform_step()
        
        // const lowest_index = this.find_lowest_index()
        // const current_cell = this.open_set.get_cell(lowest_index)

        // if (!current_cell || current_cell?.is_goal) {
        //     this.open_set = new Store()
        //     return
        // }

        // this.open_set.remove(lowest_index)
        // current_cell.visited = true
        // current_cell.stored = false

        // this.get_von_neumann_neighbourhood(current_cell).forEach((neighbour) => {
        //     if (!neighbour.visited) {
        //         const tentative_g_score = current_cell.g + neighbour.cost;

        //         let is_better_path = false;
        //         if (open_set.includes(neighbour)) {
        //             if (tentative_g_score < neighbour.g) {
        //                 neighbour.g = tentative_g_score;
        //                 is_better_path = true;
        //             }
        //         } else {
        //             neighbour.g = tentative_g_score;
        //             is_better_path = true;
        //             open_set.push(neighbour);
        //         }

        //         if (is_better_path) {
        //             neighbour.f = neighbour.g + neighbour.h;
        //             neighbour.previous = current_cell;
        //         }

        //     }
        // })
    }

}

export default AStar