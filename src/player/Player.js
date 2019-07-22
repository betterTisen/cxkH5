import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class Player extends Sprite {
  constructor() {
    const image1 = Sprite.getImage("player1");
    super(
      image1,
      0,
      0,
      image1.width,
      image1.height,
      140,
      DataStore.getInstance().canvas.height - DataStore.getInstance().res.get("road").height - image1.height / 1.5,
      image1.width / 1.5,
      image1.height / 1.5
    );

    this.time = 0; //用来控制重力加速度
    this.runY = this.y; //人物所站的位置
    this.isJumpUp = false; //判断是否正在跳跃
    this.isJumpDown = false; //判断是否正在落下

    this.isSlide = false; //判断是否在滑行
    this.slideNum = 1; //剩余可滑行的次数

    this.state = 1; //控制图片切换

    // 最大最小跳跃高度(勿改)
    this.minJump = DataStore.getInstance().canvas.height - 265;
    this.maxJump = DataStore.getInstance().canvas.height - 290;

    this.jumpHeight = this.maxJump;
  }

  jumpInit() {
    this.isJumpUp = false;
    this.isJumpDown = false;
    this.time = 0;
  }

  jumpUpEnd() {
    this.isJumpUp = false;
    this.isJumpDown = true;
    this.time = 0;
    this.jumpHeight = this.maxJump;
  }

  slideInit() {
    this.isSlide = false;
    this.slideNum = 1;
    this.time = 0;
  }

  slideEnd() {
    this.isJumpUp = false;
    this.isJumpDown = true;
    this.isSlide = false;
    this.time = 0;
    this.slideNum--;
  }

  // 人物跳跃
  jump() {
    const int = 7.5;
    const g = 0.98 / 1.8;
    const v = (g * int) / 2;
    const t = this.time / 6;

    if (this.isJumpDown) {
      this.y += (g * t * t) / 2 + (v * t) / 6;
      if (this.y >= this.runY) {
        this.y = this.runY;
        this.jumpInit();
        this.slideInit();
      }
    }

    if (this.isJumpUp) {
      this.y -= (v + 0.8) * t + (g * t * t) / 2;
      if (v - (g * t) / 2 <= 0 || this.y <= this.jumpHeight) {
        this.jumpUpEnd();
      }
    }

    this.time++;
  }

  // 人物滑行
  slide() {
    const t = 100; //滑行时间
    const v = 0.35; //滑行时的垂直速度
    // 如果滑行完毕
    if (this.time >= t) {
      this.slideEnd();
    } else if (this.y > this.runY) {
      // 如果滑行中落地
      this.slideInit();
      this.jumpInit();
      this.y = this.runY;
    } else {
      // 正在滑行
      this.y += v;
    }
    this.time++;
  }

  // 人物动画
  playerAni() {
    const img = Sprite.getImage(arguments[0]);
    this.srcW = img.width;
    this.srcH = img.height;
    this.width = img.width / 1.5;
    this.height = img.height / 1.5;
    this.state += arguments[arguments.length - 1];
    for (let i = 0; i < arguments.length - 1; i++) {
      const el = arguments[i];
      Math.floor(this.state) % (arguments.length - 1) == i && (this.img = Sprite.getImage(el));
    }
  }

  draw() {
    // 判断跳跃
    if ((this.isJumpUp || this.isJumpDown) && !this.isSlide) {
      this.playerAni("playerJump1", "playerJump2", "playerJump3", 0.2);
      this.jump();
    } else if (this.isSlide && this.slideNum > 0) {
      // 判断滑行
      this.playerAni("playerSlide1", "playerSlide2", "playerSlide3", "playerSlide4", 0.4);
      this.slide();
    } else {
      this.playerAni("player4", "player1", "player3", "player2", "player3", "player1", 0.1);
      this.y = this.runY;
    }

    super.draw(this.img, this.srcX, this.srcY, this.srcW, this.srcH, this.x, this.y, this.width, this.height);
  }
}
