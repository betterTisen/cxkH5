//背景
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class Barrier extends Sprite {
  constructor(x = 0, type = 2) {
    // 判断图片是否存在，不存在默认展示为第一张图
    if (type != 1 && type != 2 && type != 3) {
      type = 1;
    }
    const image = Sprite.getImage("barrier" + type + "-1");
    super(image, 0, 0, image.width, image.height, x, DataStore.getInstance().get("road").y - image.height / 1.8, image.width / 1.8, image.height / 1.8);
    this.x = x;
    this.type = type;
    this.state = 1;
    this.isFly();
  }

  isFly() {
    if (this.type === 3) {
      if (Math.random() >= 0.5) {
        this.y = DataStore.getInstance().get("road").y - this.height - 100 - Math.random() * 30;
      } else {
        this.y = this.y - 30;
      }
      return true;
    }
    return false;
  }

  playerAni() {
    const img = Sprite.getImage(arguments[0]);
    this.srcW = img.width;
    this.srcH = img.height;
    this.width = img.width / 1.8;
    this.height = img.height / 1.8;
    this.state += arguments[arguments.length - 1];
    for (let i = 0; i < arguments.length - 1; i++) {
      const el = arguments[i];
      Math.floor(this.state) % (arguments.length - 1) == i && (this.img = Sprite.getImage(el));
    }
  }

  draw() {
    let speed = 0.1;
    const image = `barrier${this.type}-`;
    if (this.type === 1) {
      speed = 0.3;
    }
    this.playerAni(image + "1", image + "2", image + "1", image + "3", speed);
    this.x -= DataStore.getInstance().speed;
    super.draw();
  }
}
