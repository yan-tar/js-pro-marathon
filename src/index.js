import './index.scss';
import GirlWalk from './assets/Female-5-Walk.png';
import terrainAtlas from './assets/terrain.png';
import worldCfg from './configs/world.json';
import sprites from './configs/sprites';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const sprW = 48;
const sprH = 48;
const shots = 3;
// const animSpeed = 120;
let cycle = 0;
let sprPos = 0; // spr row
let posX = 0;
let posY = 0;
const cnvW = canvas.width;
const cnvH = canvas.height;
const canvasHEnd = cnvW - sprW;
const canvasVEnd = cnvH - sprH;
const step = 10;
let keyPressed = null;

function keyDownHandler(e) {
  switch (e.key) {
    case 'Down':
    case 'ArrowDown':
    case 's':
      keyPressed = 'down';
      break;
    case 'Up':
    case 'ArrowUp':
    case 'w':
      keyPressed = 'up';
      break;
    case 'Left':
    case 'ArrowLeft':
    case 'a':
      keyPressed = 'left';
      break;
    case 'Right':
    case 'ArrowRight':
    case 'd':
      keyPressed = 'right';
      break;
    default:
      console.log(e.key, ' pressed');
      break;
  }
}

function keyUpHandler(e) {
  let keyReleased;
  switch (e.key) {
    case 'Down':
    case 'ArrowDown':
    case 's':
      keyReleased = 'down';
      break;
    case 'Up':
    case 'ArrowUp':
    case 'w':
      keyReleased = 'up';
      break;
    case 'Left':
    case 'ArrowLeft':
    case 'a':
      keyReleased = 'left';
      break;
    case 'Right':
    case 'ArrowRight':
    case 'd':
      keyReleased = 'right';
      break;
    default:
      console.log(e.key, ' released');
      break;
  }
  if (keyReleased === keyPressed) {
    keyPressed = null;
  }
}

// function showBackground() {
//   const roadSize = 40;
//   const roadpadding = 4;
//   const monumentR = 30;
//   ctx.fillStyle = 'green';
//   ctx.fillRect(0, 0, cnvW, cnvH);

//   // the yellow bricks road
//   ctx.fillStyle = 'yellow';
//   ctx.fillRect(roadpadding, 0, roadSize, cnvH);
//   ctx.fillRect(0, roadpadding, cnvW, roadSize);
//   ctx.fillRect(cnvW - roadpadding - roadSize, 0, roadSize, cnvH);
//   ctx.fillRect(0, cnvH - roadpadding - roadSize, cnvW, roadSize);
//   // crossroad
//   ctx.fillRect(cnvW / 2 - roadSize / 2, roadpadding, roadSize, cnvW - roadSize);
//   ctx.fillRect(roadpadding, cnvH / 2 - roadSize / 2, cnvH - roadSize, roadSize);

//   // monument
//   ctx.beginPath();
//   ctx.arc(cnvW / 2, cnvH / 2, monumentR, 0, 2 * Math.PI);
//   ctx.fillStyle = 'blue';
//   ctx.fill();
//   ctx.strokeStyle = 'steelblue';
//   ctx.lineWidth = monumentR / 3 - cycle * 2;
//   ctx.stroke();
//   ctx.closePath();

//   ctx.beginPath();
//   ctx.arc(cnvW / 2 + 3, cnvH / 2 - 3, 4, 0, 2 * Math.PI);
//   ctx.fillStyle = 'lightblue';
//   ctx.fill();
//   ctx.closePath();
// }

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const terrain = document.createElement('img');
terrain.src = terrainAtlas;

const girlImg = document.createElement('img');
girlImg.src = GirlWalk;

function showBackground(worldCfgBg) {
  const { map } = worldCfgBg; // деструктурируем и вытаскиваем (только) поле map
  map.forEach((cfgRow, y) => {
    cfgRow.forEach((cfgCell, x) => {
      const [sX, sY, sW, sH] = sprites.terrain[cfgCell[0]].frames[0];
      ctx.drawImage(terrain, sX, sY, sW, sH, x * sprW, y * sprH, sprW, sprH);
    });
  });
}

// timestamp - время, прошедшее с начала загрузки страницы в мс
function walk(timestamp) {
  console.log('### timestamp ###', timestamp);
  // двигаем персонажа
  if (keyPressed) {
    switch (keyPressed) {
      case 'down':
        posY += step;
        sprPos = 0;
        break;
      case 'up':
        posY -= step;
        sprPos = 3;
        break;
      case 'right':
        posX += step;
        sprPos = 2;
        break;
      case 'left':
        posX -= step;
        sprPos = 1;
        break;
      default:
        break;
    }
    cycle = (cycle + 1) % shots; // вычисляем координаты показываемого спpайта
  }
  // заставляем персонажа остановиться
  if (posX > canvasHEnd) posX = canvasHEnd;
  if (posX < 0) posX = 0;
  if (posY > canvasVEnd) posY = canvasVEnd;
  if (posY < 0) posY = 0;
  // все чистим и показываем новую картинку
  ctx.clearRect(0, 0, cnvW, cnvH);
  showBackground(worldCfg);
  ctx.drawImage(girlImg, sprW * cycle, sprH * sprPos, sprW, sprH, posX, posY, sprW, sprH);
  window.requestAnimationFrame(walk);
}

terrain.addEventListener('load', () => {
  showBackground(worldCfg);
});

girlImg.addEventListener('load', () => {
  window.requestAnimationFrame(walk);
});
