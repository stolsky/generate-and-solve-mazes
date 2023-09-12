import type Cell from "../classes/Cell";
import CellStore from "../classes/CellStore";
import type Grid from "../classes/Grid";
import type IPosition from "../classes/IPosition";
import Worker from "../classes/Worker"

class Solver extends Worker {

    protected path: CellStore

    constructor(grid: Grid) {
        super(grid)
        this.path = new CellStore()
    }

    override set_start_position(position: IPosition): Cell | undefined {
        // TODO select correct region, etc..
        return super.set_start_position(position)
    }

    draw_path(): void {

    }

}

export default Solver