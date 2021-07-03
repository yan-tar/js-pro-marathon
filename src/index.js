import './index.scss';
import GirlWalk from './assets/Female-5-Walk.png';

console.log('###### FIRST MESSAGE ######');
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const spriteW = 48;
const spriteH = 48;
const shots = 3;
const animSpeed = 200;
let cycle = 0;

const girlImg = document.createElement("img");
girlImg.src = GirlWalk;
girlImg.addEventListener("load", () => {
    setInterval(() => {
        cycle = (cycle + 1) % shots; // вычисляем координаты показываемого спрайта
        ctx.drawImage(girlImg, spriteW*cycle, 0, spriteW, spriteH, 0, 0, 100, 100);
    }, animSpeed);
}); 
