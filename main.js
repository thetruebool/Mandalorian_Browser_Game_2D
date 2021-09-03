import Player from "./Player.js";
import Bullet from "./Bullet.js";

const canvas = document.getElementById("canvas1");

const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const screenW = window.innerWidth;
const screenH = window.innerHeight;

let mouseX;
let mouseY;

const keys = [];

const player = new Player();

const playerSprite = new Image();
const bulletSprite = new Image();
let bullet;

function getMousePos(event) {
  mouseX = event.clientX - (screenW - canvas.width) / 2;
  console.log(mouseX);

  mouseY = event.clientY - (screenH - canvas.height) / 2;
  bullet = new Bullet(player);
  //player.moving = true;
}

document.addEventListener("click", getMousePos);

playerSprite.src = "mandalorian2.png";
bulletSprite.src = "laser.png";

const background = new Image();
background.src = "bg.jpg";

window.addEventListener("keydown", function (e) {
  keys[e.key] = true;
  player.moving = true;
});

window.addEventListener("keyup", function (e) {
  delete keys[e.key];
  player.moving = false;
});

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    player.draw(ctx, playerSprite);
    bullet.draw(ctx, bulletSprite);
    player.movePlayer(keys);
    bullet.moveBullet(mouseX, mouseY);

    //player.moveToMousePos(mouseX, mouseY);
    player.handlePlayerFrame();
  }
}

startAnimating(30);