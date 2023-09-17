class Ticker {

    private request_id: number;
    private callback: ((dt: number) => void) | undefined;
    private last_time: number;
    private is_running: boolean;

    private now(): number {
        return performance.now()
    }

    /** @see https://www.typescriptlang.org/docs/handbook/2/classes.html#arrow-functions */
    private readonly run = (): void => {
        if (this.is_running) {
            const now_time = this.now()
            const dt = now_time - this.last_time
            this.last_time = now_time
            if (this.callback instanceof Function) {
                this.callback(dt)
            }
            this.request_id = requestAnimationFrame(this.run)
        }
    }

    constructor() {
        this.request_id = 0
        this.callback = undefined
        this.last_time = 0
        this.is_running = false
    }

    start(callback: (delta_time: number) => void): void {
        if (!this.is_running) {
            this.callback = callback
            this.is_running = true
            this.last_time = this.now()
            this.run()
        }
    }
    
    stop(): void {
        cancelAnimationFrame(this.request_id)
        this.request_id = 0
        this.is_running = false
        this.last_time = 0
    }

}

export default Ticker