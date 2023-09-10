import Cell from "./Cell";

class Store {

    private store: Cell[]

    constructor() {
        this.store = []
    }

    add(cell: Cell) {
        cell.stored = true
        this.store.push(cell)
    }

    get_cell(index: number) {
        return this.store.at(index)
    }

    get_size() {
        return this.store.length
    }

    remove(index: number) {
        const cell = this.store.splice(index, 1).pop()
        if (cell) {
            cell.stored = false
            return cell
        }
    }

}

export default Store