//logs.js
const util = require('../../utils/util.js')
const app = getApp();
Page({
  data: {
    logs: [],
    dayImg: {},
    dayChinese:{},
    dayEnglish:{}
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  MovieTap:function(){
	  console.log("热门电影");
	  wx.navigateTo({
	    url: '../logs/movies/movies'
	  })
  },
  TranslateTap:function () {
    console.log("成语查词");
    wx.navigateTo({
      url: '../logs/translate/translate'
    })
  },
  NewsTap: function () {
    console.log("新闻阅读");
    wx.navigateTo({
      url: '../logs/news/news'
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: app.globalData.dayData,
      method: 'GET',
      header: {
        "Content-Type": ""
      },
      success: function (res) {
        console.log(res);
        that.input(res); 
      },
      fail: function () {
        console.log("调用失败2")
      },
    })
  },
  input:function(res){
    this.setData({
      dayChinese: res.data.note,
      dayEnglish: res.data.content,
      dayImg:res.data.picture2
    })
  }
})
