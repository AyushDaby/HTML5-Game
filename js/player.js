class Player {
    constructor(ctx) {
        this.ctx = ctx;

        this.hp = 1;

        // These are test values!!!
        this.x = 50; // Will we even use it?
        this.y = 50;
    }

    // Draw the player and shit
    draw() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.x, this.y, 10, 10);
    }

    // Update player attributes such as movement
    update(keys) {
        if (keys["w"]) {
            console.log("AAAAHHHHHHHHHH!!!");
        }
    }
}

export default Player;