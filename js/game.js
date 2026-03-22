class Game {
    constructor(ctx, player) {
        this.ctx = ctx;
        this.objects = [player]; // Player is first
        this.keys = {};

        // Keyboard input
        window.addEventListener("keydown", e => this.keys[e.code] = true);
        window.addEventListener("keyup", e => this.keys[e.code] = false);
    }

    nextFrame = () => {
        // Clear canvas
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Update & draw all objects
        this.objects.forEach(obj => {
            // Pass player as second argument so collisions can check player state
            obj.update(this, this.objects[0]);
            obj.draw();
        });

        requestAnimationFrame(this.nextFrame);
    }

    start() {
        this.nextFrame();
    }
}

export default Game;