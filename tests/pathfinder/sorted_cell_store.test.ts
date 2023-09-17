import {
    describe,
    expect,
    it
} from 'vitest'
import Cell from '../../src/pathfinder/classes/Cell'
import { MAIN_TYPE } from '../../src/pathfinder/types/CellType'
import SortedCellStore from '../../src/pathfinder/classes/SortedCellStore'

describe("Test sorted cell store class", () => {
    const store = new SortedCellStore()

    const cell1 = new Cell(0, 0, MAIN_TYPE.FLOOR)
    cell1.f = 3
    store.add_unique(cell1)

    const cell2 = new Cell(1, 0, MAIN_TYPE.FLOOR)
    cell2.f = 5
    store.add_unique(cell2)

    const cell3 = new Cell(2, 0, MAIN_TYPE.FLOOR)
    cell3.f = 1
    store.add_unique(cell3)

    const cell4 = new Cell(3, 0, MAIN_TYPE.FLOOR)
    cell4.f = 4
    store.add_unique(cell4)

    const cell5 = new Cell(4, 0, MAIN_TYPE.FLOOR)
    cell5.f = 2
    store.add_unique(cell5)

    it("Add", () => {
    
        expect(store.get_size()).to.be.equal(5)

        const stored_cell1 = store.get_cell(0)
        if (stored_cell1 !== undefined) {
            expect(stored_cell1).to.be.equal(cell3)
            expect(stored_cell1.f).to.be.equal(1)
        }

        const stored_cell2 = store.get_cell(1)
        if (stored_cell2 !== undefined) {
            expect(stored_cell2).to.be.equal(cell5)
            expect(stored_cell2.f).to.be.equal(2)
        }

        const stored_cell3 = store.get_cell(2)
        if (stored_cell3 !== undefined) {
            expect(stored_cell3).to.be.equal(cell1)
            expect(stored_cell3.f).to.be.equal(3)
        }

        const stored_cell4 = store.get_cell(3)
        if (stored_cell4 !== undefined) {
            expect(stored_cell4).to.be.equal(cell4)
            expect(stored_cell4.f).to.be.equal(4)
        }

        const stored_cell5 = store.get_cell(4)
        if (stored_cell5 !== undefined) {
            expect(stored_cell5).to.be.equal(cell2)
            expect(stored_cell5.f).to.be.equal(5)
        }

    })
})
