import Cell from "./Cell";

class Updates {

    private updates: Cell[]

    constructor() {
        this.updates = []
    }

    add(cell: Cell) {
        this.updates.push(cell)
    }

    clear() {
        this.updates = []
    }

    get_all() {
        return this.updates
    }

}

export default Updates