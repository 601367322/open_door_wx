//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onClick(e) {
    var doorId = e.currentTarget.dataset.name;
    wx.request({
      url: 'https://api.lookdoor.cn/func/hjapp/user/v1/login.json', //仅为示例，并非真实的接口地址
      data: {
        "pNn": "13488616135",
        "newDeviceId": "862400044009578",
        "equipmentFlag": "2",
        "pWd": "e10adc3949ba59abbe56e057f20f883e",
        "deviceId": "862400044009578",
        "userNum": "13488616135",
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success (res) {
        wx.request({
          url: 'https://api.lookdoor.cn/func/hjapp/house/v1/pushOpenDoorBySn.json', //仅为示例，并非真实的接口地址
          data: {
            "equipmentId": doorId,
            "userNum": "13488616135",
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded', // 默认值
            'cookie':res.header['Set-Cookie']
          },
          success (res) {
            wx.showToast({
              title: '成功',
            })
          }
        })
      }
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

})