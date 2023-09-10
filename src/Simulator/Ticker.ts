class Ticker {

    private request_id: number;
    private callback: ((dt: number) => void) | null;
    private last_time: number;
    private running: boolean;

    private now = () => performance.now()

    private run = () => {
        if (this.running) {
            const now_time = this.now()
            const dt = now_time - this.last_time
            this.last_time = now_time
            if (this.callback) {
                this.callback(dt)
            }
            this.request_id = requestAnimationFrame(this.run)
        }
    }

    constructor() {
        this.request_id = 0;
        this.callback = null;
        this.last_time = 0;
        this.running = false;
    }

    start(callback: (dt: number) => void) {
        if (callback && !this.running) {
            this.callback = callback
            this.running = true;
            this.last_time = this.now();
            this.run();
        }
    }
    
    stop() {
        cancelAnimationFrame(this.request_id);
        this.request_id = 0;
        this.running = false;
        this.last_time = 0;
    }

}

export default Ticker