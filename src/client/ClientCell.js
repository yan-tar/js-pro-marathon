import PositionedObject from '../common/PositionedObject';
import ClientGameObject from './ClientGameObject';

class ClientCell extends PositionedObject {
  constructor(cfg) {
    super();
    const { cellWidth, cellHeight } = cfg.world;

    Object.assign(
      this,
      {
        cfg,
        objects: [],
        x: cellWidth * cfg.cellCol,
        y: cellWidth * cfg.cellRow,
        width: cellWidth,
        height: cellHeight,
      },
      cfg,
    );

    this.initGameObjects();
  }

  initGameObjects() {
    const { cellCfg } = this;

    // this.objects = cellCfg[0].map((objCfg) => new ClientGameObject({ cell: this, objCfg }));
    this.objects = cellCfg.map((layer, layerId) => layer.map((objCfg) => new ClientGameObject({
      cell: this, 
      objCfg, 
      layerId,
    })));
  }

  render(time, layerId) {
    const { objects } = this;

    if(objects[layerId]) {
      objects[layerId].forEach((obj) => obj.render(time));
      // objects.map((obj) => obj.render(time)); // forEach более эффективен, чем map
    }
  }

  addGameObject(objToAdd) {    
    const { objects } = this;

    if(objToAdd.layerId === undefined) {
      objToAdd = objects.length;
    }

    if(!objects[objToAdd.layerId]) {
      objects[objToAdd.layerId] = [];
    }

    objects[objToAdd.layerId].push(objToAdd);
  }

  removeGameObject(objToRemove) {
    // this.objects = this.objects.filter((obj) => obj !== objToRemove);
    const { objects } = this; // деструктурируем: было this.objects.forEach, стало objects.forEach
    objects.forEach((layer, layerId) => {
      console.log('### layer', layer);
      return objects[layerId] = layer.filter((obj) => obj!==objToRemove);
    });
  }

  findObjectsByType(type) {
    let foundObjects = [];
    const { objects } = this; 

    // todo: rewrite
    objects.forEach((layer) => foundObjects = [...foundObjects, ...layer].filter((obj) => obj.type === type));
    
    return foundObjects;
  }
}

export default ClientCell;
