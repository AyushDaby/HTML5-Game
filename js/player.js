class Player {
    constructor(ctx) {
        this.ctx = ctx;

        // Position & size
        this.x = 300;
        this.y = 450;
        this.width = 200;
        this.height = 200;
        this.speed = 5;

        // Animation setup (5x5)
        this.rows = 5;
        this.cols = 5;
        this.totalFrames = this.rows * this.cols;

        this.frameIndex = 0;
        this.frameTimer = 0;

        // Sprite size
        this.spriteWidth = 3050;
        this.spriteHeight = 2635;
        this.frameWidth = this.spriteWidth / this.cols;
        this.frameHeight = this.spriteHeight / this.rows;

        // Sprites
        this.sprites = {
            fly: new Image(),
            attack: new Image(),
            damage: new Image()
        };
        this.sprites.fly.src = "./assets/parakeet_fly.png";
        this.sprites.attack.src = "./assets/parakeet_attack.png";
        this.sprites.damage.src = "./assets/parakeet_damage.png";

        // State
        this.state = "fly";
        this.currentSprite = this.sprites.fly;

        // Projectiles
        this.projectiles = [];

        // Timers
        this.flickerTimerMax = 12; // frames for initial flicker
        this.flickerTimer = 0;
        this.damageTimerMax = 20;
        this.stateTimer = 0;
    }

    setState(newState) {
        if (this.state !== newState) {
            if (newState === "attack") {
                // Start flicker at beginning of attack
                this.flickerTimer = this.flickerTimerMax;
            }

            if (newState === "damage") {
                this.stateTimer = this.damageTimerMax;
            }

            this.state = newState;
            this.currentSprite = this.sprites[newState];
            this.frameIndex = 0;
            this.frameTimer = 0;
        }
    }

    update(game) {
        // Movement
        if (game.keys["ArrowUp"]) this.y -= this.speed;
        if (game.keys["ArrowDown"]) this.y += this.speed;

        // Keep in bounds
        this.y = Math.max(this.height / 2, Math.min(game.height - this.height / 2, this.y));
        this.x = Math.max(this.width / 2, Math.min(game.width - this.width / 2, this.x));

        // COLLISIONS
        game.objects.forEach(obj => {
            if (obj === this) return;

            // Collectable triggers attack only if currently in fly
            if (obj.type === "collectable" && this.state === "fly") {
                if (this.isColliding(obj)) {
                    this.setState("attack");
                    obj.x = -100; // remove collectable
                }
            }

            // Bullet triggers damage immediately
            if (obj.type === "bullet" && this.isColliding(obj)) {
                this.setState("damage");
            }
        });

        // STATE LOGIC
        if (this.state === "attack") {
            // Shoot only when SPACE pressed
            if (game.keys["Space"] && this.frameTimer % 10 === 0) {
                this.projectiles.push({
                    x: this.x + this.width / 2,
                    y: this.y,
                    width: 15,
                    height: 15,
                    speed: 8
                });
            }
        }

        if (this.state === "damage") {
            this.stateTimer--;
            if (this.stateTimer <= 0) {
                this.setState("fly");
            }
        }

        // Update projectiles
        this.projectiles.forEach(p => p.x += p.speed);
        this.projectiles = this.projectiles.filter(p => p.x < game.width);

        // Animation
        this.frameTimer++;
        if (this.frameTimer % 8 === 0) {
            this.frameIndex = (this.frameIndex + 1) % this.totalFrames;
        }

        // Flicker countdown
        if (this.flickerTimer > 0) {
            this.flickerTimer--;
        }
    }

    isColliding(obj) {
        return (
            this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y
        );
    }

    draw() {
        let spriteToDraw = this.currentSprite;

        // Smooth flicker at attack start
        if (this.state === "attack" && this.flickerTimer > 0) {
            // Smooth toggle every 3 frames for subtle effect
            if (Math.floor(this.flickerTimer / 6) % 2 === 0) {
                spriteToDraw = this.sprites.fly;
            }
        }

        const row = Math.floor(this.frameIndex / this.cols);
        const col = this.frameIndex % this.cols;
        const sx = col * this.frameWidth;
        const sy = row * this.frameHeight;

        this.ctx.drawImage(
            spriteToDraw,
            sx, sy,
            this.frameWidth, this.frameHeight,
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );

        // Draw projectiles
        this.projectiles.forEach(p => {
            this.ctx.fillStyle = "blue";
            this.ctx.fillRect(p.x, p.y - p.height / 2, p.width, p.height);
        });
    }
}

export default Player;