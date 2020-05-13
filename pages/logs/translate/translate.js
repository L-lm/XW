// pages/logs/translate/translate.js
var util = require('../../../utils/util.js')
const app = getApp();
Page({
  data: {
    // searchResutl:{},
    // 成语的详细数据
    detailData:{},
    // 成语详细页面的显示,默认情况下为False，但成语详情存在时为true，
    detailShow:false,
    // 界面初始化显示
    beginShow:true,
    // data=Null,提示显示
    clueShow:false,
    // 用户输入框内容
    inputValue:null,
    // 输入框内X图片的显示
    clueImg:false
  },
  // 获取Value的值
  onValue:function(event){
    console.log(event.detail)
    // if(e.detail.cursor!=this.data.cursor){
      this.setData({
        inputValue: event.detail.value
      })
    console.log("input"+this.inputValue);
  },
  //搜索栏聚焦事件
  onBindFocus: function (event) {
    console.log("聚焦");
    this.setData({
      clueImg:true,
      beginShow:true,
      clueShow: false,
      detailShow: false
    })
  },
  // 取消搜说
  // onCancelImg: function () {
  //   console.log('取消');
  //   this.setData({
  //     clueImg:false,
  //     // beginShow: true,
  //     // clueShow: false,
  //     // detailShow: false,
  //     detailData:{},
  //     inputValue:""
  //   })
  // },
  // 点击搜索按钮搜索
  onBindTap:function(event){
    var text =this.data.inputValue;
    // this.setData({
    //   inputValue: text,
    // })
    console.log("value="+text);
    var searchUrl = app.globalData.juHe + "word=" + text;
    this.getTranslateData(searchUrl,text);
  },
  // 回车搜索
  onBindConfirm: function (event) {
    var text = event.detail.value
    this.setData({
      inputValue: text,
    })
    console.log(text);
    var searchUrl = app.globalData.juHe + "word=" + text;
    this.getTranslateData(searchUrl, text);
  },
  // 调用API连接获取数
  getTranslateData: function (url,text) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": ""
      },
      success: function (res) {
        that.processChengyuData(res.data.result,text);
        console.log(res);
      },
      fail: function () {
        console.log("调用失败2")
      },
    })
  },
  processChengyuData: function (data,name){
      if(data==null){
        console.log("无数据");
        this.setData({
          clueShow:true,
          beginShow:false,
          detailShow: false,
          detailData:{}
        })
      }
      else{
        console.log("有数据");
        var data = {
          name:name,
          pinyin:data.pinyin,
          chengyujs:data.chengyujs,
          from_:data.from_,
          example: data.example ? data.example : "",
          yufa:data.yufa,
          ciyujs:data.ciyujs,
          yinzhengjs:data.yinzhengjs,
          tongyi:data.tongyi,
          fanyi: data.fanyi,
        }
        this.setData({
          detailData:data,
          detailShow:true,
          beginShow:false,
          clueImg:false
        })
      }

  }
})