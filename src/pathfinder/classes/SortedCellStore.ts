import type Cell from './Cell'
import CellStore from './CellStore'

// TODO improve class that you can specify the property which is compared

/** Represents a store class that is sorted from lowest to highest
 *
 */
class SortedCellStore extends CellStore {
    override add (cell: Cell): boolean {
        let low = 0
        let high = this.store.length
        while(low < high) {
            const mid = (low + high) >>> 1
            if (this.store[mid].f < cell.f) {
                low = mid + 1
            } else {
                high = mid
            }
        }
        this.store.splice(low, 0, cell)
        cell.stored = true
        return true
    }
}

export default SortedCellStore