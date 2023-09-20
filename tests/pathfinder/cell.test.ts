import {
    describe,
    expect,
    it
} from 'vitest'
import Cell from "../../src/pathfinder/classes/Cell"
import { MAIN_TYPE } from '../../src/pathfinder/types/CellType'

describe("test Cell class", () => {
    it("instantiation", () => {
        const x = 2;
        const y = 3;
        const type = MAIN_TYPE.FLOOR
        const cell = new Cell(x, y, type)
        expect(cell).toBeInstanceOf(Cell)
        // values set by parameters
        expect(cell.x).to.be.equal(x)
        expect(cell.x).toBeTypeOf("number")
        expect(cell.y).to.be.equal(y)
        expect(cell.x).toBeTypeOf("number")
        expect(cell.type).to.be.equal(type)
        // default values
        expect(cell.predecessor).to.be.equal(undefined)
        expect(cell.sub_type).to.be.equal(MAIN_TYPE.NONE)
        expect(cell.f).to.be.equal(0)
        expect(cell.g).to.be.equal(Number.MAX_SAFE_INTEGER)
    })
    it("setter and getter", () => {
        
    })
})
