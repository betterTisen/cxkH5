import { DataStore } from "../base/DataStore.js";

export class ShowScore {
  constructor() {
    this.ctx = DataStore.getInstance().ctx;
  }

  draw() {
    this.ctx.font = "bold 24px Helvetica";
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText(
      `${DataStore.getInstance().get("score").score}`,
      DataStore.getInstance().get("gameOverMenu").width / 1.78 + DataStore.getInstance().get("gameOverMenu").x,
      DataStore.getInstance().canvas.height / 2.56,
      1000
    );
  }
}
