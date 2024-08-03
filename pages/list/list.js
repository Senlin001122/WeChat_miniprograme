Page({
  data: {
    day: '',
    query: '',
    activeTag: '全部',
    posts: [
      {
        id: 1,
        title: '第一篇帖子',
        content: '这是一个示例内容。',
        time: '10分钟前',
        likes: 10,
        comments: 5
      },
      {
        id: 2,
        title: '第二篇帖子',
        content: '这是另一个示例内容。',
        time: '20分钟前',
        likes: 20,
        comments: 10
      },
      {
        id: 3,
        title: '第二篇帖子',
        content: '这是另一个示例内容。',
        time: '20分钟前',
        likes: 20,
        comments: 10
      },
      {
        id: 4,
        title: '第二篇帖子',
        content: '这是另一个示例内容。',
        time: '20分钟前',
        likes: 20,
        comments: 10
      },
      {
        id: 2,
        title: '第二篇帖子',
        content: '这是另一个示例内容。',
        time: '20分钟前',
        likes: 20,
        comments: 10
      },
      {
        id: 2,
        title: '第二篇帖子',
        content: '这是另一个示例内容。',
        time: '20分钟前',
        likes: 20,
        comments: 10
      },
      {
        id: 2,
        title: '第二篇帖子',
        content: '这是另一个示例内容。',
        time: '20分钟前',
        likes: 20,
        comments: 10
      },
      {
        id: 2,
        title: '第二篇帖子',
        content: '这是另一个示例内容。',
        time: '20分钟前',
        likes: 20,
        comments: 10
      }

    ]
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
    console.log('搜索内容:', query);
  },
  setActiveTag: function(event) {
    const tag = event.currentTarget.dataset.tag;
    this.setData({
      activeTag: tag
    });
  },
  post: function() {
    wx.navigateTo({
      url: '/pages/post/post'
    });
  },
  likePost: function(event) {
    const postId = event.currentTarget.dataset.id;
    const posts = this.data.posts.map(post => {
      if (post.id === postId) {
        post.likes += 1;
      }
      return post;
    });
    this.setData({ posts });
  },
  commentPost: function(event) {
    const postId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/comment/comment?id=${postId}`
    });
  },
  navigateToSchedule: function() {
    wx.navigateTo({
      url: '/pages/schedule/schedule'
    });
  },
  navigateToSchool: function() {
    wx.navigateTo({
      url: '/pages/school/school'
    });
  },
  navigateToProfile: function() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    });
  }
});
