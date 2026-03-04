class Player {
    constructor(ctx) {
        this.ctx = ctx;

        this.hp = 1;

        // These are test values!!!
        this.x = 50; // Will we even use it?
        this.y = 50;

        this.width = 100;
        this.height = 100;

        // Physics stuff
        this.velY = 0;
        this.jumped = false; // Or flapped, same thing. It doesn;t matter when it's in 1's and 0's
        this.jumpForce = -20;
    }

    // Draw the player and shit
    draw() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // Update player attributes such as movement
    // TODO: Account for screen boundaries
    update(game) {
        this.velY += game.gravity;

        // Jump logic
        if (game.keys["w"] && !this.jumped) {
            this.velY += this.jumpForce;
        }

        // Run checks
        this.jumped = game.keys["w"]; // Returns a boolean
        
        // Update movement
        this.y += this.velY;
    }
}

export default Player;