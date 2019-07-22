import { Button } from "../base/Button.js";
import { DataStore } from "../base/DataStore.js";

export class JumpBtn extends Button {
  constructor() {
    const image = Button.getImage("jumpBtn");
    // super(image, 0, 0, 0, 0, 0, 0, 0, 0);
    super(image, 0, 0, image.width, image.height, 35, DataStore.getInstance().canvas.height - 120, image.width / 6, image.height / 6);
  }

  tapStart() {
    const player = DataStore.getInstance().get("player");
    // 按下跳跃按钮
    //如果没有跳起，可跳跃
    if (!player.isJumpUp && !player.isJumpDown) {
      player.isJumpUp = true;
    } else {
      // 如果已经跳起
      // 如果玩家没有在滑行或者滑行次数不为0
      if (!player.isSlide && player.slideNum > 0) {
        player.isSlide = true;
      }
    }
  }

  tapEnd() {
    const player = DataStore.getInstance().get("player");
    //如果正在跳跃的上升状态
    if (player.isJumpUp == true) {
      if (player.y > player.minJump) {
        player.jumpHeight = player.minJump;
      } else {
        player.jumpUpEnd();
      }
    }
    if (player.isSlide) {
      player.slideEnd();
    }
  }
}
