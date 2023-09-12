class Cell {

    static Type = {
        FLOOR: 0,
        WALL: 1
    } as const

    static Color = {
        floor: {
            color: "#FFFFFF",
            label: "floor"
        },
        goal: {
            color: "#00FF00",
            label: "goal"
        },
        start: {
            color: "#FF0000",
            label: "start"
        },
        stored: {
            color: "#88CCFF",
            label: "stored"
        },
        visited: {
            color: "#FFFF00",
            label: "visited"
        },
        wall: {
            color: "#000000",
            label: "wall"
        }
    } as const

    private _f: number
    private _g: number
    private _h: number
    private _is_goal: boolean
    private _is_start: boolean
    private _previous_cell: Cell | null
    private _stored: boolean
    private _type: number = -1
    private _visited: boolean
    private _x: number = -1
    private _y: number = -1
  
    constructor (x: number, y: number, type: number) {

        this.type = type
        this.x = x
        this.y = y
      
        // TODO try to reduce as much A* related atttributes as possible
        this._f = 0 // A* total cost
        this._g = Number.MAX_SAFE_INTEGER // A* cost of the cheapest path from next node to goal
        this._h = 0 // A* heuristic

        this._is_goal = false
        this._is_start = false
        this._previous_cell = null // A*
        this._stored = false
        this._visited = false
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

    get h(): number {
        return this._h
    }

    set h(h: number) {
        this._h = h
    }

    get is_goal(): boolean {
        return this._is_goal
    }

    set is_goal(is_end: boolean) {
        this._is_goal = is_end
    }

    get is_start(): boolean {
        return this._is_start
    }

    set is_start(is_start: boolean) {
        this._is_start = is_start
    }

    get previous_cell(): Cell | null {
        return this._previous_cell
    }

    set previous_cell(cell: Cell) {
        this._previous_cell = cell
    }

    get stored(): boolean {
        return this._stored
    }

    set stored(stored: boolean) {
        this._stored = stored
    }
    
    get type(): number {
        return this._type
    }

    set type(type: number) {
        if (type === Cell.Type.FLOOR || type === Cell.Type.WALL) {
            this._type = type
        }
    }

    get visited(): boolean {
        return this._visited
    }

    set visited(visited: boolean) {
        this._visited = visited
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