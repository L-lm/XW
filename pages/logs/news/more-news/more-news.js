// pages/logs/news/more-news/more-news.js
var util = require('../../../../utils/util.js')
var app = getApp();
Page({
  data: {
	 navigataeTitle: "",
	 hotsShow:false,
	 inNewsShow:false,
	 outNewsShow:false,
	 urlResult:{}
  },
  onLoad: function (options) {
	var id=options.id;
	this.data.navigataeTitle=id;
	switch(id){
		case "微博热搜":
		console.log(app.globalData.hots);
      this.setData({
			urlResult:app.globalData.hots,
			hotsShow:true,
		})
		// this.hotsData();
		break;
		case "国内新闻":
		var dataUrl=app.globalData.guoNei+"num=5";
		this.getNewsData(dataUrl,id);
		break;
		case "国际新闻":
		var dataUrl=app.globalData.guoJi+"num=5";
		this.getNewsData(dataUrl,id);
		break;
	}
  },
 // hotsData:function(){
	//  // var data = app.globalData.hots.slice(0,10)
	//      this.setData({
	//  			urlResult:app.globalData.hots.slice(0,10),
	//  			hotsShow:true
	//  		})
 // },
getNewsData: function (url, text) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": ""
      },
      success: function (res) {
          that.processNewsData(res,text);
          console.log(res) 
      },
      fail: function () {
        console.log("调用失败2")
      },
    })
  },

  // 整理热搜数据
  processNewsData:function(res, text){
	  var news=[];
	  for(var i=0;i<5;i++){
		  var temp={
		  			  ctime:res.data.newslist[i].ctime,
		  			  picUrl:res.data.newslist[i].picUrl,
					  description:res.data.newslist[0].description,
		  			  title: res.data.newslist[i].title,
		  			  url: res.data.newslist[i].url,
		  			  }
			news.push(temp);
		}
		
		  if(text=="国内新闻"){
		  			  this.setData({
		  				  urlResult:news,
		  				  inNewsShow:true
		  			  })
		  
		  }
		  if(text=="国际新闻"){
		  	this.setData({
		  		urlResult:news,
		  				outNewsShow:true
		  	})
		  }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   * 获取传入的标题
   */
  onReady: function(event) {
      wx.setNavigationBarTitle({
        title: this.data.navigataeTitle,
      })
    },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})