import type Cell from "./Cell"

class CellStore {

    protected store: Cell[]

    constructor() {
        this.store = []
    }

    add_unique(cell: Cell): boolean {
        if (this.store.find((stored) => stored.x === cell.x
        && stored.y === cell.y) === undefined) {
            this.store.push(cell)
            return true
        }
        return false
    }

    clear(): void {
        this.store = []
    }

    get_all(): Cell[] {
        return this.store
    }

    get_cell(index: number): Cell | undefined {
        return this.store.at(index)
    }

    get_size(): number {
        return this.store.length
    }

    has(cell: Cell): boolean {
        return this.store.includes(cell)
    }

    remove(index: number): Cell | undefined {
        return this.store.splice(index, 1).pop()
    }

}

export default CellStore