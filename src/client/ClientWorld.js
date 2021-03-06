import PositionedObject from '../common/PositionedObject';
import ClientCell from './ClientCell';

class ClientWorld extends PositionedObject {
  constructor(game, engine, levelCfg) {
    super();

    const worldHeight = levelCfg.map.length;
    const worldWidth = levelCfg.map[0].length;
    const cellSize = engine.canvas.height / levelCfg.camera.height;

    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: worldHeight * cellSize,
      width: worldWidth * cellSize,
      worldHeight,
      worldWidth,
      cellWidth: cellSize,
      cellHeight: cellSize,
      map: [],
    });
    console.log(this);
  }

  init() {
    const { levelCfg, map, worldWidth, worldHeight } = this;

    for (let row = 0; row < worldHeight; row++) {
      for (let col = 0; col < worldWidth; col++) {
        if (!map[row]) {
          map[row] = []; // ВОПРОС: а не проще это было написать строчкой выше, до вложенного цикла?
        }

        map[row][col] = new ClientCell({
          world: this,
          cellRow: row,
          cellCol: col,
          cellCfg: levelCfg.map[row][col],
        });
      }
    }
  }

  render(time) {
    // метод проходится по созданному миру и рисует нам ячейки
    const { map, worldWidth, worldHeight } = this;

    for (let row = 0; row < worldHeight; row++) {
      for (let col = 0; col < worldWidth; col++) {
        map[row][col].render(time);
      }
    }
  }

  // берет ячейку из нашего мира и отдает ее нам
  cellAt(col, row) {
    return this.map[row] && this.map[row][col];
  }
}

export default ClientWorld;
