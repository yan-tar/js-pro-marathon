import './index.scss';
import GirlWalk from './assets/Female-5-Walk.png';

console.log('###### FIRST MESSAGE ######');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const sprW = 48;
const sprH = 48;
const shots = 3;
const animSpeed = 120;
let cycle = 0;
let sprPos = 0; // spr row
let posX = 0;
let posY = 0;
const canvasEnd = 550;
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
      if (keyDown) {
        posY += step;
        sprPos = 0;
      }
      if (keyUp) {
        posY -= step;
        sprPos = 3;
      }
      if (keyRight) {
        posX += step;
        sprPos = 2;
      }
      if (keyLeft) {
        posX -= step;
        sprPos = 1;
      }
      cycle = (cycle + 1) % shots; // вычисляем координаты показываемого спpайта
    }
    // заставляем персонажа остановиться
    if (posX > canvasEnd) posX = canvasEnd;
    if (posX < 0) posX = 0;
    if (posY > canvasEnd) posY = canvasEnd;
    if (posY < 0) posY = 0;

    // все чистим и показываем новую картинку
    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(girlImg, sprW * cycle, sprH * sprPos, sprW, sprH, posX, posY, sprW, sprH);
  }, animSpeed);
});
