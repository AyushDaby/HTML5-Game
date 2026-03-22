class Player {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = 100;
        this.y = 250;
        this.width  = 200;
        this.height = 200;
        this.dead = false;

        this.spdY = 0;
        this.gravity = 0.5;
        this.flapPower = -8;

        // Animation state
        this.frameIndex = 0;

        // Spritesheet frame size
        this.spriteWidth = 768;
        this.spriteHeight = 768;

        // Load spritesheet image
        this.sprite = new Image();
        this.sprite.src = "./assets/parakeet.png";
    }

    // Update player
    update(game) {
        this.spdY += this.gravity;
        this.y += this.spdY;

        // Set boundaries
        this.y = Math.min(
            Math.max(this.height / 2, this.y), // Top limit
            game.height - this.height / 2      // Bottom limit
        );

        // Jump
        if (game.keys["Space"]) {
            this.spdY = this.flapPower;
        }

        // Handle animation timing
        if (game.frameTimer % 10 === 0) {
            this.frameIndex = (this.frameIndex + 1) % 2;
        }
    }

    // Draw player
    draw() {
        const sx = this.frameIndex * this.spriteWidth;
        const sy = 0;

        this.ctx.drawImage(
            this.sprite,
            sx, sy,
            this.spriteWidth, this.spriteHeight,
            this.x - this.width / 2, this.y - this.height / 2,
            this.width, this.height
        );
    }
}

export default Player;