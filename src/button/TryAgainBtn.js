import { Button } from "../base/Button.js";
import { DataStore } from "../base/DataStore.js";

export class TryAgainBtn extends Button {
  constructor() {
    const image = Button.getImage("tryAgainBtn");
    super(image, 0, 0, image.width, image.height, 100, DataStore.getInstance().canvas.height / 2.3, image.width/1.5, image.height/1.5);
  }

  tap() {
    cancelAnimationFrame(this.dataStore.get("timer"));
    this.dataStore.isGameOver = false;
  }
}
