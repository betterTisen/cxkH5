// 变量的缓存器
export class DataStore {
  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  constructor() {
    this.speed = 5; //页面滚动速度

    this.isGameOver = true; //判断游戏是否结束

    this.isMainMenu = true;//是否展示主菜单

    this.keyState = true;

    this.map = new Map();
  }

  get(key) {
    return this.map.get(key);
  }

  put(key, value) {
    if (typeof value == "function") {
      value = new value();
    }
    this.map.set(key, value);
    return this;
  }

  destroy() {
    for (let value of this.map.values()) {
      value = null;
    }
  }
}
