//排行榜
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class RankMenu extends Sprite {
  constructor() {
    const image = Sprite.getImage("rankMenu");
    super(image, 0, 0, image.width, image.height, 0, 0, 350, DataStore.getInstance().canvas.height);
  }
}
