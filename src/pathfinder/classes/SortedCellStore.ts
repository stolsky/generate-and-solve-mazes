import type Cell from './Cell'
import CellStore from './CellStore'



/** Represents a store class that is sorted from lowest to highest
 *
 */
class SortedCellStore extends CellStore {

    // TODO improve class that you can specify the property which is compared
    // constructor

    override add_unique (cell: Cell): boolean {
        if (this.store.find((stored) => stored.x === cell.x
        && stored.y === cell.y) === undefined) {
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
            return true
        }
        return false
    }
}

export default SortedCellStore