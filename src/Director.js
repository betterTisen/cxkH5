import { DataStore } from "./base/DataStore.js";
import { Barrier } from "./runtime/Barrier.js";
import { Road } from "./runtime/Road.js";

export class Director {
  static getInstance() {
    if (!Director.instance) {
      this.instance = new Director();
    }
    return this.instance;
  }

  constructor() {
    this.dataStore = DataStore.getInstance();
  }

  // 创建障碍物
  createBarrier() {
    const MaxBarriers = 2; //最多存在2个障碍物
    const CreateDistance = this.dataStore.canvas.width / 2; //第一个障碍物到达第二个障碍物创建的位置
    const randomX = 350; //随机生成障碍物距离屏幕右边宽度的位置

    let barriers = this.dataStore.get("barriers");

    let type = Math.floor(1 + Math.random() * 3); //障碍物类型
    let x = this.dataStore.canvas.width + 18 * this.dataStore.speed + Math.random() * randomX; //障碍物随机位置

    if (barriers.length == 0) {
      this.dataStore.get("barriers").push(new Barrier(x, type));
    }

    if (barriers[0].x < 0 - barriers[0].width) {
      //移除超出屏幕的障碍物
      this.dataStore.get("barriers").shift();
    }
    if (barriers.length < MaxBarriers && barriers[0].x < CreateDistance) {
      // 创建障碍物
      this.dataStore.get("barriers").push(new Barrier(x, type));
    }
  }

  //判断玩家是否撞击
  check() {
    const player = this.dataStore.get("player");
    const barriers = this.dataStore.get("barriers")[0];

    const playerBorder = {
      top: player.y,
      bottom: player.y + player.height,
      left: player.x,
      right: player.x + player.width
    };
    const barrierBorder = {
      top: barriers.y,
      bottom: barriers.y + barriers.height,
      left: barriers.x,
      right: barriers.x + barriers.width
    };
    // 是否撞击到第一个障碍物
    if (
      !this.dataStore.isGameOver &&
      playerBorder.bottom >= barrierBorder.top &&
      playerBorder.top <= barrierBorder.bottom &&
      playerBorder.left <= barrierBorder.right &&
      playerBorder.right >= barrierBorder.left
    ) {
      this.handleGameOverDraw();
      // this.dataStore.openDataCtx.postMessage({
      //   command: "updataScore",
      //   score: this.dataStore.get("score").score.toString()
      // });
      // DataStore.getInstance().ctx.drawImage(DataStore.getInstance().sharedCanvas, 50, 10);
    }
  }

  // 主菜单页面
  handleMainMenuDraw() {
    this.dataStore.get("mainMenu").draw();
    this.dataStore.get("startBtn").draw();
    this.dataStore.get("rankBtn").draw();
    if (this.dataStore.get("rankBtn").state) {
      this.dataStore.get("rankMenu").draw();
      this.dataStore.get("closeRankBtn").draw();
      // this.dataStore.ctx.drawImage(DataStore.getInstance().sharedCanvas, 0, 0);
    }
  }

  // 游戏开始时的画面
  handleGameStartDraw() {
    this.dataStore.get("score").score++;
    this.createBarrier();
    this.dataStore.get("barriers").forEach(el => {
      el.draw();
    });
    this.dataStore.get("jumpBtn").draw();
    this.dataStore.get("level").draw();
    this.dataStore.get("score").draw();
  }

  // 游戏结束时候的画面
  handleGameOverDraw() {
    this.dataStore.isGameOver = true;
    this.dataStore.get("gameOverMenu").draw();
    this.dataStore.get("tryAgainBtn").draw();
    this.dataStore.get("backToMenuBtn").draw();
    this.dataStore.get("showScore").draw();
    cancelAnimationFrame(this.dataStore.get("timer"));
    // //触发微信小游戏垃圾回收
    // wx.triggerGC();
  }

  run() {
    this.check();
    this.dataStore.get("background").draw();
    this.dataStore.get("road").draw();
    this.dataStore.get("player").draw();
    if (!this.dataStore.isGameOver) {
      // 游戏进行时
      this.handleGameStartDraw();
    } else if (this.dataStore.isMainMenu) {
      // 展示主菜单页面
      this.handleMainMenuDraw();
    } else {
      // 游戏结束时
      this.handleGameOverDraw();
    }
    let timer = requestAnimationFrame(() => this.run());
    this.dataStore.put("timer", timer);
  }
}
