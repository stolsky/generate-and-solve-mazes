class ContextWrapper {

    private readonly TWO_PI = Math.PI * 2

    private readonly renderer: CanvasRenderingContext2D

    constructor(renderer: CanvasRenderingContext2D) {
        this.renderer = renderer
    }

    clear(): void {
        const { width, height } = this.renderer.canvas
        this.renderer.clearRect(0, 0, width, height)
    }

    fill_rect(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string
    ): void {
        this.renderer.fillStyle = color
        this.renderer.fillRect(x, y, width, height)
    }

    fill_circle(
        x: number,
        y: number,
        radius: number,
        color: string
    ): void {
        this.renderer.beginPath()
        this.renderer.arc(x, y, radius, 0, this.TWO_PI)

        this.renderer.fillStyle = color
        this.renderer.fill()
    }

}

export default ContextWrapper