import {
    MAIN_TYPE,
    type MainType,
    SUB_TYPE,
    type SubType
} from "../types/CellTypes"

class Cell {

    private _x: number = -1
    private _y: number = -1
    
    private _f: number
    private _g: number

    private _type: MainType = MAIN_TYPE.NONE
    private _sub_type: SubType = SUB_TYPE.NONE

    private _predecessor: Cell | undefined
  
    constructor (x: number, y: number, type: MainType) {

        this.type = type
        this.x = x
        this.y = y
      
        this._f = 0 // Dijkstra, A* total cost
        this._g = Number.MAX_SAFE_INTEGER // A* cost of the cheapest path from next node to goal
        this._predecessor = undefined
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
