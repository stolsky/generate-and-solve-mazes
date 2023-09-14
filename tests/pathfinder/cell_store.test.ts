import {
    describe,
    expect,
    it
} from 'vitest'
import Cell from '../../src/pathfinder/classes/Cell'
import CellStore from '../../src/pathfinder/classes/CellStore'
import { MainType } from '../../src/pathfinder/classes/CellTypes'

describe("Test cell store class", () => {

    it("Instantiation", () => {
        const store = new CellStore()
        expect(store).to.be.instanceOf(CellStore)
        expect(store.get_size()).to.be.equal(0)

        const cells = store.get_all()
        expect(cells).to.be.instanceOf(Array<Cell>)
        expect(cells.length).to.be.equal(0)

        const single_cell = store.get_cell(0)
        expect(single_cell).to.be.equal(undefined)

        const removed_cell = store.remove(0)
        expect(removed_cell).to.be.equal(undefined)
    })

    it("Add only cells which different position", () => {
        const store = new CellStore()

        expect(store.add(new Cell(0, 0, MainType.FLOOR))).to.be.equal(true)
        expect(store.add(new Cell(1, 0, MainType.FLOOR))).to.be.equal(true)
        expect(store.add(new Cell(0, 1, MainType.FLOOR))).to.be.equal(true)
        expect(store.add(new Cell(1, 1, MainType.FLOOR))).to.be.equal(true)
        // duplicate
        expect(store.add(new Cell(1, 1, MainType.FLOOR))).to.be.equal(false)
    
        expect(store.get_size()).to.be.equal(4)
    })

    it("Get size", () => {
        const store = new CellStore()

        store.add(new Cell(0, 0, MainType.FLOOR))
        expect(store.get_size()).to.be.equal(1)

        store.add(new Cell(1, 0, MainType.WALL))
        expect(store.get_size()).to.be.equal(2)

        store.add(new Cell(2, 0, MainType.FLOOR))
        expect(store.get_size()).to.be.equal(3)
    })

    it("Get Cell", () => {
        const store = new CellStore()
        const cell = new Cell(0, 0, MainType.FLOOR)
        store.add(cell)
        const stored_cell = store.get_cell(0)
        expect(stored_cell).to.be.equal(cell)
    })

    it("Get all", () => {
        const store = new CellStore()
        const cells = [
            new Cell(0, 0, MainType.FLOOR),
            new Cell(1, 0, MainType.WALL),
            new Cell(2, 0, MainType.FLOOR)
        ]
        cells.forEach((cell) => store.add(cell))
        
        const stored_cells = store.get_all()
        stored_cells.forEach((cell, index) => expect(cell).to.be.equal(cells[index]))
    })

    it("Remove", () => {
        const store = new CellStore()
        const cell = new Cell(0, 0, MainType.FLOOR)
        store.add(cell)
        const removed_cell = store.remove(0)
        expect(store.get_size()).to.be.equal(0)
        expect(removed_cell).to.be.equal(cell)
    })

    it("Clear", () => {
        const store = new CellStore()

        store.add(new Cell(0, 0, MainType.FLOOR))
        store.add(new Cell(1, 0, MainType.WALL))
        store.add(new Cell(2, 0, MainType.FLOOR))
        expect(store.get_size()).to.be.equal(3)

        store.clear()
        expect(store.get_size()).to.be.equal(0)
    })

})