import EventSourceMixin from '../common/EventSourceMixin';
import ClientCamera from './ClientCamera';
import ClientInput from './ClientInput';

class ClientEngine {
  constructor(canvas, game) {
    // расширяем this класса ClientEngine - канвасом и контекстом
    Object.assign(this, {
      canvas,
      ctx: null,
      imageLoaders: [], // здесь будем хранить картинки
      sprites: {},
      images: {},
      camera: new ClientCamera({ canvas, engine: this }),
      input: new ClientInput(canvas),
      game
    });

    this.ctx = canvas.getContext('2d');

    this.loop = this.loop.bind(this);

    console.log(this);
  }

  start() {
    this.loop();
  }

  loop(timestamp) {
    const { ctx, canvas } = this; // деструктурируем, чтоб проще обращаться?
    ctx.fillStyle = 'black';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.trigger('render', timestamp);
    this.initNextFrame();
  }

  initNextFrame() {
    window.requestAnimationFrame(this.loop); // типа рекурсия?
    // именно тут теряется контекст для лупа
  }

  loadSprites(spritesGroup) {
    this.imageLoaders = []; // на всякий случай очищаем массив

    Object.keys(spritesGroup).forEach((groupName) => {
      const group = spritesGroup[groupName];
      this.sprites[groupName] = group; // object with diff sprites group
      console.log('### groupName', groupName);

      Object.keys(group).forEach((spriteName) => {
        console.log('### spriteName', spriteName); // group[spriteName] - object ({img} & frames[])
        const { img } = group[spriteName]; // деструктуризация, вытаскиваем только url картинки
        if (!this.images[img]) {
          this.imageLoaders.push(this.loadImage(img));
        }
      });
    });

    return Promise.all(this.imageLoaders); // TODO: повторить промисы, охохо
  }

  loadImage(url) {
    return new Promise((resolve) => {
      const i = new Image();
      this.images[url] = i;
      i.onload = () => resolve(i);
      i.src = url;
    });
  }

  renderSpriteFrame({ sprite, frame, x, y, w, h }) {
    const spriteCfg = this.sprites[sprite[0]][sprite[1]];
    const [fx, fy, fw, fh] = spriteCfg.frames[frame];
    const img = this.images[spriteCfg.img];
    const camera = this.camera;

    this.ctx.drawImage(img, fx, fy, fw, fh, x - camera.x, y - camera.y, w, h);
  }
}

Object.assign(ClientEngine.prototype, EventSourceMixin); // а почему мы не делаем это в конструкторе?

export default ClientEngine;
