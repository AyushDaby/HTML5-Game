class Background {
    constructor(ctx, speedModifier = 0.5) {
        this.ctx = ctx;
        this.speedModifier = speedModifier;

        this.bg = new Image();
        this.bg.src = "./assets/background.png";

        this.frame = new Image();
        this.frame.src = "./assets/border.png";

        this.x = 0;
        this.speed = 2 * this.speedModifier;
    }

    update() {
        const canvasWidth = this.ctx.canvas.width;

        this.x -= this.speed;

        // seamless loop
        if (this.x <= -canvasWidth) {
            this.x = 0;
        }
    }

    draw() {
        const canvasWidth = this.ctx.canvas.width;
        const canvasHeight = this.ctx.canvas.height;

        // scrolling jungle background
        this.ctx.drawImage(
            this.bg,
            this.x,
            0,
            canvasWidth,
            canvasHeight
        );

        this.ctx.drawImage(
            this.bg,
            this.x + canvasWidth,
            0,
            canvasWidth,
            canvasHeight
        );

        // static frame overlay
        this.ctx.drawImage(
            this.frame,
            0,
            0,
            canvasWidth,
            canvasHeight
        );
    }
}

export default Background;