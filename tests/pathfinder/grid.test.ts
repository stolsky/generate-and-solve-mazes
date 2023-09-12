import {
    describe,
    expect,
    it
} from 'vitest'
import Cell from '../../src/pathfinder/classes/Cell'
import Grid from '../../src/pathfinder/classes/Grid'

describe("Test grid class", () => {

    it("Get cell", () => {
        const grid = new Grid(20, 20)
        grid.init(Cell.Type.FLOOR)
        const first_cell = grid.get_cell(0, 0)
        expect(first_cell).to.be.instanceOf(Cell)
        const last_cell = grid.get_cell(19, 19)
        expect(last_cell).to.be.instanceOf(Cell)

        const undefined_cell = grid.get_cell(20, 20)
        expect(undefined_cell).to.be.equal(undefined)
    })

})