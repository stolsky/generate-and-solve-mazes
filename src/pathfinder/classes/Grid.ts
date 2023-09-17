import Cell from "./Cell"
import type IPosition from "../types/IPosition"

class Grid {

    static calculate_von_neumann_directions = (x: number, y: number): IPosition[] => [
        { x, y: y - 1},  // north
        { x: x + 1, y }, // east
        { x, y: y + 1},  // south
        { x: x - 1, y}   // west
    ]

    static calculate_moore_directions = (x: number, y: number): IPosition[] => [
        { x, y: y - 1},  // north
        { x: x + 1, y: y - 1},  // north east
        { x: x + 1, y }, // east
        { x: x + 1, y: y + 1},  // south east
        { x, y: y + 1},  // south
        { x: x - 1, y: y + 1},  // south west
        { x: x - 1, y},   // west
        { x: x - 1, y: y - 1},  // north west
    ]

    static calculate_look_ahead = (x: number, y: number): IPosition[] => [
        { x, y: y - 2},  // north
        { x: x + 2, y }, // east
        { x, y: y + 2},  // south
        { x: x - 2, y}   // west
    ]

    private readonly _width: number
    private readonly _height: number
    private cells: Cell[]

    private is_inside (x: number, y: number): boolean {
        return x > -1 && x < this.width && y > -1 && y < this.height
    }

    private get_neighbourhood_from_directions (directions: IPosition[]): Cell[] {
        const neighbours: Cell[] = []
        directions.forEach((direction) => {
            const neighbour = this.get_cell(direction.x, direction.y)
            if (neighbour !== undefined) {
                neighbours.push(neighbour)
            }
        })
        return neighbours
    }

    private hash_index (x: number, y: number): number {
        return x * this.height + y
    }

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
        this.cells = []
    }

    get height(): number {
        return this._height
    }

    get width(): number {
        return this._width
    }

    clean_copy(): Grid {
        const copy = new Grid(this.width, this.height)
        for (let x = 0; x < this.width; x = x + 1) {
            for (let y = 0; y < this.height; y = y + 1) {
                const index = this.hash_index(x, y)
                const old_cell = this.cells[index]
                copy.cells[index] = new Cell(x, y, old_cell.type)
            }
        }
        return copy
    }

    get_cell(x: number, y: number): Cell | undefined {
        if (this.is_inside(x, y)) {
            return this.cells[this.hash_index(x, y)]
        }
        return undefined
    }

    get_moore_neighbourhood (cell: Cell): Cell[] {
        return this.get_neighbourhood_from_directions(
            Grid.calculate_moore_directions(cell.x, cell.y)
        )
    }


    /** This algorithm finds all direct neighbors of a cell, i.e. all neighbors that have a boundary to this cell.
     * 
     * In a rectangular grid it is called Von Neumann neighbourhood.
     */
    get_adjacent_neighbours (cell: Cell): Cell[] {
        return this.get_neighbourhood_from_directions(
            Grid.calculate_von_neumann_directions(cell.x, cell.y)
        )
    }

    init(type: number): void {
        for (let x = 0; x < this.width; x = x + 1) {
            for (let y = 0; y < this.height; y = y + 1) {
                this.cells[this.hash_index(x, y)] = new Cell(x, y, type)
            }
        }
    }

    each(callback: (cell: Cell) => void): void {
        this.cells.forEach((cell) => {
            callback(cell)
        })
    }

  }
  
  export default Grid