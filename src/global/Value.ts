class Value {

    private readonly _max: number
    private readonly _min: number
    private _std: number

    constructor (max: number = 0, min: number = 0, std: number = 0) {
        this._max = max
        this._min = min
        this._std = std
    }

    get max (): number {
        return this._max
    }

    get min (): number {
        return this._min
    }

    get std (): number {
        return this._std
    }

    set std (std: number) {
        this._std = std
    }
}

export default Value