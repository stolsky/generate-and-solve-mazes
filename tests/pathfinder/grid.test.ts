import {
    describe,
    expect,
    it
} from 'vitest'
import Cell from '../../src/pathfinder/classes/Cell'
import Grid from '../../src/pathfinder/classes/Grid'
import { MainType } from '../../src/pathfinder/classes/CellTypes'

describe("Test grid class", () => {

    it("Get cell", () => {
        const grid = new Grid(20, 24)
        grid.init(MainType.FLOOR)

        const first_cell = grid.get_cell(0, 0)
        expect(first_cell).to.be.instanceOf(Cell)
        if (first_cell instanceof Cell) {
            expect(first_cell.x).to.be.equal(0)
            expect(first_cell.y).to.be.equal(0)
        }
        
        const last_cell = grid.get_cell(19, 23)
        expect(last_cell).to.be.instanceOf(Cell)
        if (last_cell instanceof Cell) {
            expect(last_cell.x).to.be.equal(19)
            expect(last_cell.y).to.be.equal(23)
        }

        const undefined_cell1 = grid.get_cell(20, 20)
        expect(undefined_cell1).to.be.equal(undefined)

        const undefined_cell2 = grid.get_cell(10, 24)
        expect(undefined_cell2).to.be.equal(undefined)
    })

})