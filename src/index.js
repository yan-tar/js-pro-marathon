import './index.scss';
import GirlWalk from './assets/Female-5-Walk.png';

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

function showBackground() {
  const roadSize = 40;
  const roadpadding = 4;
  const cnvSize = 600;
  const monumentR = 30;
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, cnvSize, cnvSize);

  // the yellow bricks road
  ctx.fillStyle = 'yellow';
  ctx.fillRect(roadpadding, 0, roadSize, cnvSize);
  ctx.fillRect(0, roadpadding, cnvSize, roadSize);
  ctx.fillRect(cnvSize - roadpadding - roadSize, 0, roadSize, cnvSize);
  ctx.fillRect(0, cnvSize - roadpadding - roadSize, cnvSize, roadSize);
  // crossroad
  ctx.fillRect(cnvSize / 2 - roadSize / 2, roadpadding, roadSize, cnvSize - roadSize);
  ctx.fillRect(roadpadding, cnvSize / 2 - roadSize / 2, cnvSize - roadSize, roadSize);

  // monument
  ctx.beginPath();
  ctx.arc(cnvSize / 2, cnvSize / 2, monumentR, 0, 2 * Math.PI);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.strokeStyle = 'steelblue';
  ctx.lineWidth = monumentR / 3 - cycle * 2;
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(cnvSize / 2 + 3, cnvSize / 2 - 3, 4, 0, 2 * Math.PI);
  ctx.fillStyle = 'lightblue';
  ctx.fill();
  ctx.closePath();
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
    showBackground();
    ctx.drawImage(girlImg, sprW * cycle, sprH * sprPos, sprW, sprH, posX, posY, sprW, sprH);
  }, animSpeed);
});
