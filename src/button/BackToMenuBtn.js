import { Button } from "../base/Button.js";
import { DataStore } from "../base/DataStore.js";

export class BackToMenuBtn extends Button {
  constructor() {
    const image = Button.getImage("backToMenuBtn");
    super(
      image,
      0,
      0,
      image.width,
      image.height,
      DataStore.getInstance().canvas.width - image.width / 1.5 - 100,
      DataStore.getInstance().canvas.height / 2.2,
      image.width / 1.5,
      image.height / 1.5
    );
  }

  tap() {
    DataStore.getInstance().isMainMenu = true;
  }
}
