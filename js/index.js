// This is the project's entry point
// Script loaded with defer, so document body should be all set

import Player from "./player.js";
import Game from "./game.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resizeWindow() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeWindow);
resizeWindow(); // Initial resize

// Setup game here
const player = new Player();
const game = new Game(ctx, player);

game.gameLoop();