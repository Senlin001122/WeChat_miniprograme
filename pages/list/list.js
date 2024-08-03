Page({
  data: {
    day: '',
    query: ''
  },
  onLoad: function() {
    this.updateDay();
  },
  updateDay: function() {
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const today = new Date().getDay();
    this.setData({
      day: days[today]
    });
  },
  onInput: function(event) {
    this.setData({
      query: event.detail.value
    });
  },
  onSearch: function() {
    const query = this.data.query;
    wx.showToast({
      title: `搜索内容: ${query}`,
      icon: 'none'
    });
    // 在这里处理搜索逻辑
    console.log('搜索内容:', query);
  },
  navigateToSchedule: function() {
    wx.navigateTo({
      url: '/pages/schedule/schedule'
    });
  },
  navigateToSchool: function() {
    wx.navigateTo({
      url: '/pages/list/list'
    });
  },
  navigateToProfile: function() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    });
  }
});
