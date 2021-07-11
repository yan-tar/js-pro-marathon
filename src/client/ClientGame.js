import ClientEngine from './ClientEngine';
import sprites from '../configs/sprites';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg, // дополняем this нашего класса конфигом
    });
    this.engine = this.createEngine();

    this.initEngine(); 

    console.log(this);
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId));
  }

  initEngine() {
    this.engine
      .loadSprites(sprites)
      .then(() => {
        console.log('### this.engine', this.engine);
        this.engine.start();
      });    
  }

  // TODO: learn what "static" means
  // т.к. этот метод статичный, он не участвует во внутренних приватных методах нашего класса,
  // но может быть вызван у нашего класса как метод у объекта, без создания экземпляра класса
  // будет инициализировать нашу игру
  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
      console.log('### Game INIT ###');
    }
  }
}

export default ClientGame;
