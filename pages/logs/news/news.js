// pages/logs/news/news.js
var util = require('../../../utils/util.js')
const app = getApp();
Page({
  data: {
    // 屏幕高度
  scrollHeight:0,
	navbar:['热搜','社会','国际','娱乐'],
    currentTab:0,
	  // 显示的数据内容
    newsResult:[],
    //加载显示
    showThis:false,
    // 加载的图片
    icon:"",
    // 加载的文字
    iconText:"加载中..."
  },
  navbarTap:function(e){
	var sSum=0,gSum=0,ySum=0;
	var num=e.currentTarget.dataset.idx
	  // console.log(num);
		this.setData({
		 currentTab:num
	 })
	 switch(num){
		 // 微博热搜
	 	case 0:
			this.setData({
				newsResult:app.globalData.hots,
			})
	 	break;
		// 社会新闻
	 	case 1:
		sSum++;
		if(sSum==1){
			var dataUrl=app.globalData.guoNei;
			this.getNewsData(dataUrl,"社会新闻");
		}
		else{
			this.setData({
				newsResult:app.globalData.shNews,
			})
		}
	 	break;
		
		// 国际新闻
	 	case 2:
		gSum++;
		if(gSum==1){
			var dataUrl=app.globalData.guoJi;
			this.getNewsData(dataUrl,"国际新闻");
		}
		else{
			this.setData({
				newsResult:app.globalData.gjNews,
			})
		}
	 	break;
		
		// 娱乐新闻
		case 3:
		ySum++
		if(ySum==1){
			var dataUrl=app.globalData.yuLe;
			this.getNewsData(dataUrl,"娱乐新闻");
		}
		else{
			this.setData({
				newsResult:app.globalData.ylNews,
			})
		}
		break;
	 }
	 
  },
  ScrollToupper:function(event){
	 console.log("顶部被触发");
	 console.log(event.currentTarget.dataset.id)
	 var id=event.currentTarget.dataset.id;
    switch(id){
		case 0:
    var Url = app.globalData.reSou;
    this.getNewsData(Url, "微博热搜");
		this.setData({
			showThis:true,
		})
		break;
		case 1:
		var Url=app.globalData.guoNei;
		this.getNewsData(Url,"国内新闻");
		this.setData({
			showThis:true,
		})
		break;
		case 2:
		var Url=app.globalData.guoJi;
		this.getNewsData(Url,"国际新闻");
		this.setData({
			showThis:true,
		})
		break;
		case 3:
		var Url=app.globalData.yuLe;
		this.getNewsData(Url,"娱乐新闻");
		this.setData({
			showThis:true,
		})
		break;
	}
  },
  /**
   * 生命周期函数--监听页面加载
   * 页面加载完成后调用数据
   */
  onLoad: function (options) {
  var hotsUrl=app.globalData.reSou;
	this.getNewsData(hotsUrl,"微博热搜");
  var that=this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.screenHeight+400
        });
      }
    });
  },
  getNewsData: function (url,text) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": ""
      },
      success: function (res) {
          that.processNewsData(res,text);
      },
      fail: function () {
        console.log("调用失败2")
		that.setData({
			showThis:true,
			iconText:"加载失败..."
		})
      },
    })
  },

  // 整理热搜数据
  processNewsData:function(res, text){
	  var that=this
      if(text=="微博热搜"){
		var hotNews=[];
		// data=res.header.Date;
		for(var i=0;i<res.data.newslist.length;i++){
			var temp={
				id:i+1,
				hotword:res.data.newslist[i].hotword,
				hotwordnum:res.data.newslist[i].hotwordnum
			}
			hotNews.push(temp);
		}
		app.globalData.hots=hotNews;
		// app.globalData.hotsDate=date;
		that.setData({
			newsResult:hotNews,
			showThis: false,
		})
		console.log(app.globalData.hots);
		
      }
	  else{
		  var news=[];
		  for(var i=0;i<res.data.newslist.length;i++){
			  var t= res.data.newslist[i].title;
			  if(t.length >= 25) {
			          t = t.substring(0, 25) + "...";
			        }
			  var New={
			  			  ctime:res.data.newslist[i].ctime,
			  			  picUrl:res.data.newslist[i].picUrl,
			  			  description:res.data.newslist[i].description,
			  			  title:t,
						  url:res.data.newslist[i].url
			  }
			  news.push(New);			  
		  }	  
		  if(text=="社会新闻"){
			 app.globalData.shNews=news;
			 that.setData({
				 newsResult:news,
				showThis: false,
			 })
		  }
		  if(text=="国际新闻"){
			app.globalData.gjNews=news;
		  	that.setData({
		  		newsResult:news,
				showThis: false,
		  	})
		  }
		  if(text=="娱乐新闻"){
			 app.globalData.ylNews=news;
		  	that.setData({
		  		newsResult:news,
				showThis: false,
		  	})
		  }
	  }
  // console.log(res)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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