class RenderingContextWrapper {

    private readonly renderer: CanvasRenderingContext2D

    constructor(renderer: CanvasRenderingContext2D) {
        this.renderer = renderer
    }

    fillRect(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string
    ): void {
        this.renderer.fillStyle = color
        this.renderer.fillRect(x, y, width, height)
    }

}

export default RenderingContextWrapper