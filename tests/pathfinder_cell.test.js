import {
    describe,
    expect,
    it
} from 'vitest'

import Cell from "../src/Pathfinder/classes/Cell"

describe("test Cell class", () => {
    it("instantiation", () => {
        const cell = new Cell()
        expect(cell).toBeInstanceOf(Cell)
    })
    it("use correct values for position", () => {
        const cell = new Cell(0, 0)
        const x = cell.x
        const y = cell.y
        expect(x).toBe(0)
        expect(x).toBeTypeOf("number")
        expect(y).toBe(0)
        expect(y).toBeTypeOf("number")
    })
    it("reset position with correct values", () => {
        const cell = new Cell(0, 0)
        cell.x = 1
        cell.y = 2
        const x = cell.x
        const y = cell.y
        expect(x).toBe(1)
        expect(x).toBeTypeOf("number")
        expect(y).toBe(2)
        expect(y).toBeTypeOf("number")
    })
    it("use false values for position", () => {
        const cell = new Cell(0.3, 4/5)
        const x = cell.x
        const y = cell.y
        expect(x).toBe(-1)
        expect(y).toBe(-1)
    })

})
