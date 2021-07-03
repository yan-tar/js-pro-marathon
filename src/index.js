import './index.scss';
import GirlWalk from './assets/Female-5-Walk.png';

console.log('###### FIRST MESSAGE ######');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const spriteW = 48;
const spriteH = 48;
const shots = 3;
const animSpeed = 120;
let cycle = 0;
let posX = 0;
let posY = 0;
const canvasEnd = 510;
const step = 10;
let keyPressed = false;
let keyDown = false;
let keyUp = false;
let keyRight = false;
let keyLeft = false;

function keyDownHandler(e) {
  switch (e.key) {
    case 'Down':
    case 'ArrowDown':
    case 's':
      keyDown = true;
      break;
    case 'Up':
    case 'ArrowUp':
    case 'w':
      keyUp = true;
      break;
    case 'Left':
    case 'ArrowLeft':
    case 'a':
      keyLeft = true;
      break;
    case 'Right':
    case 'ArrowRight':
    case 'd':
      keyRight = true;
      break;
    default:
      return;
  }
  keyPressed = keyDown || keyUp || keyRight || keyLeft;
}

function keyUpHandler(e) {
  switch (e.key) {
    case 'Down':
    case 'ArrowDown':
    case 's':
      keyDown = false;
      break;
    case 'Up':
    case 'ArrowUp':
    case 'w':
      keyUp = false;
      break;
    case 'Left':
    case 'ArrowLeft':
    case 'a':
      keyLeft = false;
      break;
    case 'Right':
    case 'ArrowRight':
    case 'd':
      keyRight = false;
      break;
    default:
      return;
  }
  keyPressed = keyDown || keyUp || keyRight || keyLeft;
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const girlImg = document.createElement('img');
girlImg.src = GirlWalk;

girlImg.addEventListener('load', () => {
  setInterval(() => {
    // двигаем персонажа
    if (keyPressed) {
      if (keyDown) posY += step;
      if (keyUp) posY -= step;
      if (keyRight) posX += step;
      if (keyLeft) posX -= step;
    }
    // заставляем персонажа остановиться
    if (posX > canvasEnd) posX = canvasEnd;
    if (posX < 0) posX = 0;
    if (posY > canvasEnd) posY = canvasEnd;
    if (posY < 0) posY = 0;

    // все чистим и показываем новую картинку
    ctx.clearRect(0, 0, 600, 600);
    cycle = (cycle + 1) % shots; // вычисляем координаты показываемого спpайта
    ctx.drawImage(girlImg, spriteW * cycle, 0, spriteW, spriteH, posX, posY, 100, 100);
  }, animSpeed);
});
