interface Information {
    readonly ID: number
    readonly FULL: string
    readonly SHORT: string

    readonly DESCR?: string
    readonly PROS?: string // multiple pro's must be seperated by comma
    readonly CONS?: string // multiple con's must be seperated by comma
}

export default Information