let sharedCanvas = wx.getSharedCanvas();
let context = sharedCanvas.getContext("2d");
let map = new Map();

// 预加载图片资源
wx.getFriendCloudStorage({
  keyList: ["score"],
  success: res => {
    let data = res.data;
    for (let i = 0; i < data.length; i++) {
      const el = data[i];
      const image = new Image();
      image.src = el.avatarUrl;
      map.set(el.openid, image);
    }
  }
});

// 处理排行宝列表渲染
function drawRankList(data, screen) {
  let listLength;
  data.length > 5 ? (listLength = 5) : (listLength = data.length);
  console.log(screen);

  const marginTop = screen.height / 2.778;
  const marginLeft = 100;
  const lineHeight = screen.height / 8.929;

  // 循环渲染列表
  for (let index = 0; index < listLength; index++) {
    const item = data[index];
    context.font = "bold 15px Helvetica";
    context.fillStyle = "#948eeb";
    context.fillText(item.nickname, marginLeft + 35, lineHeight * index + marginTop);
    const image = map.get(item.openid);
    context.drawImage(image, 0, 0, image.width, image.height, marginLeft, lineHeight * index + marginTop - 20, 30, 30);
    context.fillText(item.KVDataList[0].value, marginLeft + 138, lineHeight * index + marginTop);
  }
}

//   更新用户分数
function updataScore(data) {
  wx.setUserCloudStorage({
    KVDataList: [
      {
        key: "score",
        value: data.score
      }
    ],
    success: res => {}
  });
}

// 处理传值事件
wx.onMessage(data => {
  if (data.command === "render") {
    // 获取好友列表
    wx.getFriendCloudStorage({
      keyList: ["score"],
      success: res => {
        res = res.data;
        drawRankList(res, data.screen);
      }
    });
  } else if (data.command === "updataScore") {
    wx.getUserCloudStorage({
      keyList: ["score"],
      success: res => {
        if (res.KVDataList[0].value < data.score) {
          updataScore(data);
        }
      }
    });
  }
});
