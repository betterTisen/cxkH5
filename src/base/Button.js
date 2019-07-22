import { Sprite } from "./Sprite.js";
import { DataStore } from "./DataStore.js";

export class Button extends Sprite {
  constructor(img = null, srcX = 0, srcY = 0, srcW = 0, srcH = 0, x = 0, y = 0, width = 0, height = 0) {
    super(img, srcX, srcY, srcW, srcH, x, y, width, height);
    this.border = {
      top: this.y,
      bottom: this.y + this.height,
      left: this.x,
      right: this.x + this.width
    };
  }
  check(el) {
    return el.offsetX <= this.border.right && el.offsetX >= this.border.left && el.offsetY <= this.border.bottom && el.offsetY >= this.border.top;
  }
}
