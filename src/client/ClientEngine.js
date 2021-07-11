class ClientEngine {
  constructor(canvas) {
    console.log(canvas);

    // расширяем this класса ClientEngine - канвасом и контекстом
    Object.assign(this, {
      canvas,
      ctx: null,
    })

    this.ctx = canvas.getContext('2d');

    this.loop = this.loop.bind(this); // TODO: почему мы потеряли именно loop?

    console.log(this);
  }

  start() {
    this.loop();
  }

  loop(timestamp) {
    const {ctx, canvas} = this; // деструктурируем, чтоб проще обращаться?
    ctx.fillStyle = 'black';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.initNextFrame();
  }

  initNextFrame() {
    window.requestAnimationFrame(this.loop); // типа рекурсия?
  }
}

export default ClientEngine;