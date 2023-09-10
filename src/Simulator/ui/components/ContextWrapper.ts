class RenderingContextWrapper {

    private context: CanvasRenderingContext2D

    constructor(context: CanvasRenderingContext2D | null) {
        this.context = (context) ?? {} as CanvasRenderingContext2D
    }

    fillRect(x: number, y: number, width: number, height: number, color: string) {
        this.context.fillStyle = color
        this.context.fillRect(x, y, width, height)
    }

}

export default RenderingContextWrapper