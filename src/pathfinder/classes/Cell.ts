import { MainType, SubType } from "./CellTypes"

class Cell {

    private _x: number = -1
    private _y: number = -1
    
    private _f: number
    private _g: number

    private _type: MainType = MainType.NONE
    private _sub_type: SubType = SubType.NONE

    private _predecessor: Cell | undefined
  
    constructor (x: number, y: number, type: MainType) {

        this.type = type
        this.x = x
        this.y = y
      
        // TODO try to reduce as much A* related atttributes as possible
        this._f = 0 // A* total cost
        this._g = Number.MAX_SAFE_INTEGER // A* cost of the cheapest path from next node to goal

        this._predecessor = undefined // A*
    }

    get f(): number {
        return this._f
    }

    set f(f: number) {
        this._f = f
    }

    get g(): number {
        return this._g
    }

    set g(g: number) {
        this._g = g
    }

    get predecessor(): Cell | undefined {
        return this._predecessor
    }

    set predecessor(cell: Cell) {
        this._predecessor = cell
    }

    get sub_type(): SubType {
        return this._sub_type
    }

    set sub_type(type: SubType) {
        this._sub_type = type
    }
    
    get type(): MainType {
        return this._type
    }

    set type(type: MainType) {
        this._type = type
    }

    get x(): number {
        return this._x
    }

    set x(x: number) {
        if (Number.isInteger(x)) {
            this._x = x
        }
    }

    get y(): number {
        return this._y
    }

    set y(y: number) {
        if (Number.isInteger(y)) {
            this._y = y
        } 
    }

}

export default Cell
