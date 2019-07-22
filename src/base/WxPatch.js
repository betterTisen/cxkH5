import { DataStore } from "./DataStore.js";

export class WxPatch {
  static fixScreen(canvas) {
    let width = canvas.width;
    let height = canvas.height;
    if (!WxPatch.fixedScreen && height > width) {
      canvas.width = height;
      canvas.height = width;
      WxPatch.fixedScreen = true;
    }
  }
}
