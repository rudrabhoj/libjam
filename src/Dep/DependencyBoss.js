import SmartDepend from '../Dep/SmartDepend.js';

//Control
import Game from '../Control/Game.js';

//Resource
  //Resource
  import BotA from '../Resource/BotA.js';
  import BotB from '../Resource/BotB.js';

  //Loader
  import Loader from '../Resource/Loader/Loader.js';


class DependencyBoss {
  constructor() {
    this._allocateResources();

    this._setupTypes();
    this._decorate();
    this._injectDependencies();
    this._declareBindings();

    this._generateObjects();
  }

  getMainObj() {
    return this._mainObj;
  }

  _allocateResources() {
    this._depManager = new SmartDepend();
    this._container = this._getDepContainer();
  }

  _setupTypes() {
    this._types = {
      //Control
        //Control
        Game             : {name: "Game",               class: Game,         single: false},

      //Resource
        //Resource
        BotA             : {name: "BotA",               class: BotA,         single: false},
        BotB             : {name: "BotB",               class: BotB,         single: false},
        //Loader
        Loader           : {name: "Loader",             class: Loader,       single: false}
    }

    this._addObjects();
  }

  _addObjects() {
    for (let type in this._types) {
      if(this._types[type].single) {
        //console.log("NAME OF SINGLE: %s", this._types[type].name);
      }
      this._addType(this._types[type].name,  this._types[type].class, this._types[type].single);
    }
  }

  _injectDependencies() {
    //Control
      //Control
      this._addDependency(this._types.Game.name,  this._types.Loader.name);

    //Resource
      //Resource
      this._addDependency(this._types.BotA.name,  this._types.BotB.name);
  }

  _generateObjects() {
    this._mainObj  = this._container.get(this._types.Game.name);
  }

  //Foreign dependencies
  _addDependency(type, dependency) {
    this._depManager.addDependency(type, dependency);
  }

  _addType(typeName, typeClass, typeSingle) {
    this._depManager.addObject(typeName, typeClass, typeSingle);
  }

  _decorate() {
    this._depManager.decorate();
  }

  _declareBindings() {
    this._depManager.bindAll();
  }

  _getDepContainer() {
    return this._depManager.container;
  }
}


export default DependencyBoss;
