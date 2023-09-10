import Cell from "./Cell"

class Grid {

    static calculate_directions = (x: number, y: number) => [
        { x, y: y - 1},  // north
        { x: x + 1, y }, // east
        { x, y: y + 1},  // south
        { x: x - 1, y}   // west
    ]
    static calculate_look_ahead = (x: number, y: number) => [
        { x, y: y - 2},  // north
        { x: x + 2, y }, // east
        { x, y: y + 2},  // south
        { x: x - 2, y}   // west
    ]

    private _width: number = 0
    private _height: number = 0
    private grid: Cell[][]

    private is_inside = (x: number, y: number) =>
        x > -1 && x < this.width
        && y > -1 && y < this.height
  
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.grid = []
    }

    get height() {
        return this._height
    }

    set height(height: number) {
        if (height > 0 && Number.isInteger(height)) {
            this._height = height
        }
        
    }

    get width() {
        return this._width
    }

    set width(width: number) {
        if (width > 0 && Number.isInteger(width)) {
            this._width = width
        }
        
    }

    copy() {
        const copy = new Grid(this.width, this.height)
        this.grid.forEach((row, index) => {
            copy.grid[index] = [...row]
        })
        return copy
    }
    
    get_cell(x: number, y: number) {
        if (this.is_inside(x, y)) {
            return this.grid[x][y]
        }
    }

    init(type: number) {
        for (let x = 0; x < this.width; x = x + 1) {
            this.grid[x] = [];
            for (let y = 0; y < this.height; y = y + 1) {
                this.grid[x][y] = new Cell(x, y, type);
            }
        }
    }

  }
  
  export default Grid