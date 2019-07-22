import { WxPatch } from "./base/WxPatch.js";
import { DataStore } from "./base/DataStore.js";
import { Director } from "./Director.js";
import { ResourceLoader } from "./base/ResourceLoader.js";
import { MainMenu } from "./menu/MainMenu.js";
import { RankMenu } from "./menu/RankMenu.js";
import { CloseRankBtn } from "./button/CloseRankBtn.js";
import { BackGround } from "./runtime/Background.js";
import { Road } from "./runtime/Road.js";
import { Barrier } from "./runtime/Barrier.js";
import { Player } from "./player/Player.js";
import { Level } from "./player/Level.js";
import { Score } from "./player/Score.js";
import { ShowScore } from "./player/ShowScore.js";
import { GameOverMenu } from "./menu/GameOverMenu.js";
import { JumpBtn } from "./button/JumpBtn.js";
import { StartBtn } from "./button/StartBtn.js";
import { RankBtn } from "./button/RankBtn.js";
import { TryAgainBtn } from "./button/TryAgainBtn.js";
import { BackToMenuBtn } from "./button/BackToMenuBtn.js";

export class Main {
  constructor() {
    this.canvas = document.getElementById("cxk");
    this.ctx = this.canvas.getContext("2d");
    this.director = Director.getInstance();
    this.dataStore = DataStore.getInstance();
    // WxPatch.fixScreen(this.canvas); //处理ios横版的问题
    const loader = ResourceLoader.getInstance();
    loader.onLoaded(map => this.onResourceFirstLoaded(map));
    this.registerEvent();
  }

  onResourceFirstLoaded(map) {
    this.dataStore.canvas = this.canvas;
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    this.init();
  }

  init() {
    // wx.offTouchStart();
    // wx.offTouchEnd();
    this.dataStore
      .put("mainMenu", MainMenu)
      .put("rankMenu", RankMenu)
      .put("closeRankBtn", CloseRankBtn)
      .put("background", BackGround)
      .put("road", Road)
      .put("player", Player)
      .put("level", Level)
      .put("score", Score)
      .put("showScore", ShowScore)
      .put("gameOverMenu", GameOverMenu)
      .put("barriers", [])
      .put("jumpBtn", JumpBtn)
      .put("startBtn", StartBtn)
      .put("rankBtn", RankBtn)
      .put("tryAgainBtn", TryAgainBtn)
      .put("backToMenuBtn", BackToMenuBtn);
    this.director.createBarrier();
    this.director.run();
  }

  registerEvent() {
    // 注册点击事件
    this.canvas.addEventListener("mousedown", e => {
      // 如果游戏结束
      // console.log(e);
      if (this.dataStore.isGameOver && !this.dataStore.isMainMenu) {
        if (this.dataStore.get("tryAgainBtn").check(e)) {
          // 点击再来一局按钮
          this.dataStore.get("tryAgainBtn").tap();
          this.init();
        } else if (this.dataStore.get("backToMenuBtn").check(e)) {
          this.dataStore.get("backToMenuBtn").tap();
        }
      } else if (this.dataStore.isMainMenu) {
        // 如果在主菜单
        if (this.dataStore.get("startBtn").check(e)) {
          // 点击开始按钮
          this.dataStore.get("startBtn").tap();
          this.init();
        } else if (this.dataStore.get("rankBtn").check(e)) {
          this.dataStore.get("rankBtn").tap();
        } else if (this.dataStore.get("closeRankBtn").check(e)) {
          this.dataStore.get("closeRankBtn").tap();
        }
      } else {
        // 如果游戏正在进行
        // 触摸跳跃按钮
        // if (this.dataStore.get("jumpBtn").check(e)) {
        //   this.dataStore.get("jumpBtn").tapStart();
        // }
      }
    });

    // this.canvas.addEventListener("mouseup", e => {
    //   if (!this.dataStore.isGameOver) {
    //     // 触摸跳跃按钮
    //     if (this.dataStore.get("jumpBtn").check(e)) {
    //       this.dataStore.get("jumpBtn").tapEnd();
    //     }
    //   }
    // });

    window.addEventListener("keydown", e => {
      if (e.code === "Space" && !this.dataStore.isGameOver && !this.dataStore.isMainMenu && this.dataStore.keyState) {
        this.dataStore.get("jumpBtn").tapStart();
      }
      this.dataStore.keyState = false;
    });
    window.addEventListener("keyup", e => {
      if (e.code === "Space" && !this.dataStore.isGameOver && !this.dataStore.isMainMenu) {
        this.dataStore.get("jumpBtn").tapEnd();
      }
      this.dataStore.keyState = true;
    });
  }
}
