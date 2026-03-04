class Game {
    constructor(ctx, player) {
        this.ctx = ctx;

        // Argument player is an object of class Player
        this.gravity = 0.5;
        this.objects = [player]; // Players, Enemies and all that go in here

        this.keys = {};
        window.addEventListener("keydown", e => this.keys[e.key] = true);
        window.addEventListener("keyup", e => this.keys[e.key] = false); // Unset keys
    }

    // Renders next frame, and also updates respective attributes
    nextFrame = () => {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        // Update attributes
        this.objects.forEach(i => {
            i.update(this);
            i.draw();
        });

        requestAnimationFrame(this.nextFrame);
    }

    gameLoop() {
        this.nextFrame();
    }
}

export default Game;