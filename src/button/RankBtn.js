import { Button } from "../base/Button.js";
import { DataStore } from "../base/DataStore.js";

export class RankBtn extends Button {
  constructor() {
    const image = Button.getImage("rankBtn");
    super(
      image,
      0,
      0,
      image.width,
      image.height,
      DataStore.getInstance().canvas.width - image.width / 1.5 - 35,
      DataStore.getInstance().canvas.height - image.height / 1.5 - 60,
      image.width / 1.5,
      image.height / 1.5
    );
    this.state = false;
  }

  tap() {
    // this.dataStore.openDataCtx.postMessage({
    //   command: "render",
    //   screen:{
    //     width:DataStore.getInstance().canvas.width,
    //     height:DataStore.getInstance().canvas.height
    //   }
    // });
    this.state = true;
  }
}
