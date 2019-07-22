import { Button } from "../base/Button.js";
import { DataStore } from "../base/DataStore.js";

export class CloseRankBtn extends Button {
  constructor() {
    const image = Button.getImage("closeRankBtn1");
    super(image, 0, 0, image.width, image.height, 285, (DataStore.getInstance().canvas.height - image.height / 1.6) / 2, image.width / 1.6, image.height / 1.6);
    this.state = 1;
  }

  playerAni() {
    const img = Button.getImage(arguments[0]);
    this.srcW = img.width;
    this.srcH = img.height;
    this.width = img.width / 1.8;
    this.height = img.height / 1.8;
    this.state += arguments[arguments.length - 1];
    for (let i = 0; i < arguments.length - 1; i++) {
      const el = arguments[i];
      Math.floor(this.state) % (arguments.length - 1) == i && (this.img = Button.getImage(el));
    }
  }

  draw() {
    this.playerAni("closeRankBtn1", "closeRankBtn2", "closeRankBtn3", "closeRankBtn4", "closeRankBtn5", "closeRankBtn6", "closeRankBtn7",0.3);
    super.draw();
  }

  tap() {
    DataStore.getInstance().get("rankBtn").state = false;
  }
}
