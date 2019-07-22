//等级
import { DataStore } from "../base/DataStore.js";

export class Level {
  constructor() {
    this.ctx = DataStore.getInstance().ctx;
    this.levelNumber = 0;
  }

  upLevel() {
    const idx = 1000; //升一级需要多少分
    this.levelNumber = Math.floor(DataStore.getInstance().get("score").score / idx);
    DataStore.getInstance().speed = 5 + this.levelNumber;
  }

  draw() {
    this.upLevel();
    this.ctx.font = "bold 20px Helvetica";
    this.ctx.fillStyle = "#948eeb";
    this.ctx.fillText(this.levelNumber, DataStore.getInstance().canvas.width / 3.33, DataStore.getInstance().canvas.height / 13.5, 1000);
  }
}
