import { Button } from "../base/Button.js";
import { DataStore } from "../base/DataStore.js";

export class StartBtn extends Button {
  constructor() {
    const image = Button.getImage("startBtn");
    super(
      image,
      0,
      0,
      image.width,
      image.height,
      DataStore.getInstance().canvas.width - image.width / 1.5 - 55,
      DataStore.getInstance().canvas.height - image.height / 1.5 - 155,
      image.width / 1.5,
      image.height / 1.5
    );
  }

  tap() {
    cancelAnimationFrame(DataStore.getInstance().get("timer"));
    DataStore.getInstance().isGameOver = false;
    DataStore.getInstance().isMainMenu = false;
  }
}
