class Player {
    constructor() {
        this.hp = 1;
        this.x = 10; // Will we even use it?
        this.y = 0;
    }

    // Draw the player and shit
    draw() {

    }

    // Update player attributes such as movement
    update(keys) {
        if (keys["w"]) {
            console.log("AAAAHHHHHHHHHH!!!");
        }
    }
}

export default Player;