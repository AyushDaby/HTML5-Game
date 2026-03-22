class Collectable extends EventTarget {
    constructor(
        {ctx, x, y, width, height, movementVector, target, event, 
        objToPassOnCollide, spriteSrc, spriteWidth, spriteHeight}
    ) {
        super();
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // Regarding game logic
        this.dead = false;
        this.movementVector = movementVector;

        // Regarding collision
        this.target = target;
        this.event = event;
        this.objToPassOnCollide = objToPassOnCollide;

        // Regarding rendering
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;

        this.sprite = new Image();
        this.sprite.src = spriteSrc;

        // Animation state
        this.frameIndex = 0;
    }

    // Will usually move in a certain direction
    update(game) {
        this.x += this.movementVector; // y usually unchanged
        this.onCollide(game);
        
        // Handle animation timing
        if (game.frameTimer % 10 === 0) {
            this.frameIndex = (this.frameIndex + 1) % 2; // NOTE: Hardcoded
        }
    }

    // Draws the collectible
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

    // Fires custom event when colliding with player or another sprite
    onCollide(game) {
        const e = new CustomEvent(this.event, {
            detail: this.objToPassOnCollide,
        });

        // Collision detection
        const offsetX = 2;
        const collided = 
            this.target.x + this.target.width > this.x * offsetX &&
            this.target.x < this.x + this.width &&  
            this.target.y + this.target.height > this.y &&
            this.target.y < this.y + this.height;
            
        if (collided && !this.dead) {
            this.dead = true;
            game.dispatchEvent(e); // NOTE: Event is dispatched by game
        }
    }
}

export default Collectable;