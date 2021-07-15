import MovableObject from '../common/MovableObject';

class ClientCamera extends MovableObject {
  constructor(cfg) {
    super(cfg);  // наследуем конфиг из MovableObject

    Object.assign(this, { // расширяем this этим унаследованным конфигом
      cfg,
      width: cfg.canvas.width, // и добавляем (куда??) ширину и высоту канваса
      height: cfg.canvas.height
    }, cfg); // TODO: а вот этот конфиг тут зачем?
  }

  focusAtGameObject(obj) {
    const pos = obj.worldPosition(50,50);
    this.moveTo(pos.x - this.width/2, pos.y - this.height/2, false); // я так понимаю, центрируем относительно центра объекта, а не левого верхнего угла
  }
}

export default ClientCamera;
