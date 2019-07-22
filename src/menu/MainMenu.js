//背景
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class MainMenu extends Sprite {
  constructor() {
    const image = Sprite.getImage("mainMenu");
    super(image, 0, 0, image.width, image.height, 0, 0, DataStore.getInstance().canvas.width, DataStore.getInstance().canvas.height);
  }
}
