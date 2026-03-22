import coinArgs from "./coin.js";
import Spawner from "./spawner.js";

class Game extends EventTarget {
    constructor(ctx, width, height, player) {
        super();

        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.score = 0;

        // Creates a coin spawner
        coinArgs.ctx = ctx;
        coinArgs.target = player;
        this.coinSpawner = new Spawner(ctx, 120, coinArgs);

        // NOTE: Attaching EXAMPLE listener
        this.addEventListener("coinCollected", this.onCoinCollected);

        // Game logic
        this.frameTimer = -1;
        this.objects = [player]; // Player and collectibles

        // Handle player input
        this.keys = {};
        window.addEventListener("keydown", e => this.keys[e.code] = true);
        window.addEventListener("keyup", e => this.keys[e.code] = false);
    }

    // Coin collection handler
    onCoinCollected = (e) => {
        this.score += e.detail.value;
        console.log("Coins:", this.score, "\nDetail:", e.detail);
    }

    // Runs every animation frame
    nextFrame = () => {
        this.frameTimer++;
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Update systems
        this.coinSpawner.update(this);

        // Update and draw every object in the game
        this.objects.forEach(obj => {
            obj.update(this);
            obj.draw();
        });

        // Removes used sprites (i.e. collectables)
        if (this.objects[0].dead) {
            // Show game over
        }

        this.objects = this.objects.filter(o => !o.dead);
        requestAnimationFrame(this.nextFrame);
    }

    // Starts the game
    start() {
        this.nextFrame();
    }
}

export default Game;