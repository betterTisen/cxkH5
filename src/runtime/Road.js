//陆地
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class Road extends Sprite {
  constructor() {
    const image = Sprite.getImage("road");

    super(image, 0, 0, image.width, image.height, 0, DataStore.getInstance().canvas.height - image.height, image.width, image.height);

  }
  draw() {
    this.x -= DataStore.getInstance().speed;

    if (this.width + this.x <= DataStore.getInstance().canvas.width) {
      this.x = 0;
    }
    super.draw();
  }
}
