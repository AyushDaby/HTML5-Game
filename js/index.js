import Game from "./game.js";
import Player from "./player.js";
import Background from "./background.js";
import Collision from "./collision.js";

// Canvas setup
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resizeWindow() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeWindow);
resizeWindow();

// Create objects
const background = new Background(ctx, 3.5);
const player = new Player(ctx);

// Moving collisions
const collectable = new Collision(500, 300, 80, "collectable", ctx, 3);
const bullet = new Collision(800, 300, 80, "bullet", ctx, 5);

// Start game
const game = new Game(ctx, player);

// Canvas size
game.width = canvas.width;
game.height = canvas.height;

// Add background first
game.objects.unshift(background);

// Add player and collision objects
game.objects.push(collectable);
game.objects.push(bullet);

game.start();