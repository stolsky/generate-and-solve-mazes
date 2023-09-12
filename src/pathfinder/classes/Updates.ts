import type Cell from "./Cell";

// TODO check if can be replaced with cell store
class Updates {

    private updates: Cell[]

    constructor() {
        this.updates = []
    }

    add(cell: Cell): void {
        this.updates.push(cell)
    }

    clear(): void {
        this.updates = []
    }

    get_all(): Cell[] {
        return this.updates
    }

}

export default Updates