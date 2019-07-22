//计分器类
import { DataStore } from "../base/DataStore.js";

export class Score {
  constructor() {
    this.ctx = DataStore.getInstance().ctx;
    this.score = 0;
  }

  draw() {
    this.ctx.font = "bold 20px Helvetica";
    this.ctx.fillStyle = "#948eeb";
    this.ctx.fillText(this.score, DataStore.getInstance().canvas.width / 1.58, DataStore.getInstance().canvas.height / 13.5, 1000);
  }
}
