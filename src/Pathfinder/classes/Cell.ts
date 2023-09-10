class Cell {

    static Type = {
        FLOOR: 0,
        WALL: 1
    } as const

    private _is_goal: boolean
    private _is_start: boolean
    private _stored: boolean
    private _type: number = -1
    private _visited: boolean
    private _x: number = -1
    private _y: number = -1
  
    constructor (x: number, y: number, type: number) {

        this.type = type
        this.x = x
        this.y = y
      
        this._is_goal = false
        this._is_start = false
        this._stored = false
        this._visited = false
    }

    get is_goal() {
        return this._is_goal
    }

    set is_goal(is_end: boolean) {
        this._is_goal = is_end
    }

    get is_start() {
        return this._is_start
    }

    set is_start(is_start: boolean) {
        this._is_start = is_start
    }

    get stored() {
        return this._stored
    }

    set stored(stored: boolean) {
        this._stored = stored
    }
    
    get type() {
        return this._type
    }
    set type(type: number) {
        if (type === Cell.Type.FLOOR || type === Cell.Type.WALL) {
            this._type = type
        }
    }

    get visited() {
        return this._visited
    }

    set visited(visited: boolean) {
        this._visited = visited
    }

    get x() {
        return this._x
    }

    set x(x: number) {
        if (Number.isInteger(x)) {
            this._x = x
        }
    }

    get y() {
        return this._y
    }

    set y(y: number) {
        if (Number.isInteger(y)) {
            this._y = y
        } 
    }

}

export default Cell