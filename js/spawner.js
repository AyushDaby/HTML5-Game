import Collectable from "./collectable.js";

class Spawner {
    constructor(ctx, spawnInterval, collectableArgs) {
        this.ctx = ctx;
        this.spawnInterval = spawnInterval;
        this.collectableArgs = collectableArgs;
    }

    update(game) {
        if (game.frameTimer % this.spawnInterval === 0) {
            const x = game.width + 100; // Starts offscreen
            const y = Math.random() * (game.height - this.collectableArgs.height) + this.collectableArgs.height / 2;
            
            this.collectableArgs.x = x;
            this.collectableArgs.y = y;

            const collectable = new Collectable(this.collectableArgs);
            game.objects.push(collectable);
            
            // NOTE: Other objects have event listeners to handle
            //       collection logic, typically orchestrated by Game
        }
    }
}

export default Spawner;