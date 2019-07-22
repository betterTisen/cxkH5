import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class GameOverMenu extends Sprite {
  constructor() {
    const image = Sprite.getImage("gameOverMenu");
    super(image, 0, 0, image.width, image.height, 50, 50, DataStore.getInstance().canvas.width - 100, DataStore.getInstance().canvas.height - 100);
  }
}
