//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力,创建一个本地存储，名字叫logs，数组形式
    var logs = wx.getStorageSync('logs') || []
	// 向当前是logs中中存入当前时间
    logs.unshift(Date.now())
	// 存入数据库      数据库名称，内容
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
		  console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    hots:{},
	shNews:{},
	gjNews:{},
	ylNews:{},
	//豆瓣
	doubanBase:"http://t.yushu.im",
	// doubanBase:"https://douban.uieee.com",
  // 每日一句
  dayData:"http://open.iciba.com/dsapi/?date=",
  // 聚合数据
    juHe: "http://v.juhe.cn/chengyu/query?key=814c0c8045654d6836c188b808624c8c&",
  // apishop数据
    apishop:"https://api.apishop.net/common/chengyu/searchChengyu？apiKey=ACKyNfV7922ac3379ae5c3aedb1fddb496b003eb060fe45&keyWord=蛇",
    // afanda数据
    afangDa:"http://api.avatardata.cn/ChengYu/Search?key= 18d92c40347349af8e6ee1860ee289f1&keyWord=龙马精神",
	//天行数据
// 	// 微博热搜榜
	reSou:"http://api.tianapi.com/txapi/weibohot/index?Array&key=219a65f5045069a449668c067b6d652d",
// 	// 社会新闻
	guoNei:"http://api.tianapi.com/guonei/index?Array&key=219a65f5045069a449668c067b6d652d&num=10",
// 	// 国际新闻
	guoJi:"http://api.tianapi.com/world/index?Array&key=219a65f5045069a449668c067b6d652d&num=10",
	// 娱乐新闻
	yuLe:"http://api.tianapi.com/huabian/index?key=219a65f5045069a449668c067b6d652d&num=10",
// 	// 网页文章全文
	newsDeatil:"http://api.tianapi.com/txapi/htmltext/index?Array&key=219a65f5045069a449668c067b6d652d&url="
  },
  
})