Page({
  data: {
    username: '神秘人物',
    userId: '社区 ID: 当前未认证',
    avatar: '/images/avatar.png',
    stats: {
      posts: 0,
      likes: 0,
      comments: 0,
      favorites: 0
    }
  },
  
  updateAvatar: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          avatar: res.tempFilePaths[0]
        });
      }
    });
  },

  onShareAppMessage: function () {
    return {
      title: '分享好友',
      path: '/pages/index/index' // 修改为你想分享的页面路径
    };
  },

});
