class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
      sprH: 48,
      sprW: 48,
    });
    console.log(this);
  }

  init() {
    const { map } = this.levelCfg;
    map.forEach((cfgRow, y) => {
      cfgRow.forEach((cfgCell, x) => {
        this.engine.renderSpriteFrame({
          sprite: ['terrain', cfgCell[0]],
          frame: 0,
          x: x * this.sprW,
          y: y * this.sprH,
          w: this.sprW,
          h: this.sprH,
        });
      });
    });
  }
}

export default ClientWorld;
