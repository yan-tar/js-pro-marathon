import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';

import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg, // дополняем this нашего класса конфигом
    });
    this.engine = this.createEngine();
    this.map = this.createWorld();

    this.initEngine();

    console.log(this);
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId));
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.engine.on('render', (_, time) => { // а этот прочерк всегда можно ставить вместо несуществующего аргумента?
        // console.log('### render', time ) // time - это наш timestamp
        this.map.init();
      }); // регистрируем событие: картинки загрузились, ура
      this.engine.start();
    });
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
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
