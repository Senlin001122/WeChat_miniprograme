Page({
  data: {
    currentMonth: '',
    weekDays: [],
    timeSlots: [
      { time: '08:00  09:00', classes: [] },
      { time: '09:00  10:00', classes: [] },
      { time: '10:00  11:00', classes: [] },
      { time: '11:00  12:00', classes: [] },
      { time: '12:00  13:00', classes: [] },
      { time: '13:00  14:00', classes: [] },
      { time: '14:00  15:00', classes: [] },
      { time: '15:00  16:00', classes: [] },
      { time: '16:00  17:00', classes: [] },
      { time: '17:00  18:00', classes: [] },
      { time: '18:00  19:00', classes: [] },
      { time: '19:00  20:00', classes: [] },
      { time: '20:00  21:00', classes: [] },
      { time: '21:00  22:00', classes: [] },
      { time: '22:00  23:00', classes: [] },
    ],
    selectedDay: '',
    currentWeek: 1
  },
  onLoad: function() {
    this.updateWeekDays();
  },
  updateWeekDays: function() {
    const daysOfWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const weekDays = [];
    const today = new Date();
    const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay(); // 今天是星期几，周日返回7
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (dayOfWeek - 1)); // 本周的周一

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startDate);
      currentDay.setDate(startDate.getDate() + i);
      const month = currentDay.getMonth() + 1;
      const date = currentDay.getDate();
      weekDays.push({
        day: daysOfWeek[i],
        date: `${month < 10 ? '0' + month : month}/${date < 10 ? '0' + date : date}`
      });
    }

    this.setData({
      weekDays,
      selectedDay: weekDays[0].day, // 默认选择周一
      currentMonth: today.getMonth() + 1 // 获取当前月份
    });

    // 页面加载时默认加载周一的课程数据
    this.loadClassesForDay(this.data.selectedDay);
  },
  selectDay: function(event) {
    const selectedDay = event.currentTarget.dataset.day.day;
    this.setData({ selectedDay });
    // 根据选择的日期加载对应的课程数据
    this.loadClassesForDay(selectedDay);
  },
  loadClassesForDay: function(day) {
    // 根据选择的日期加载对应的课程数据
    const classes = [
      {
        course_code: '高数',
        class_time: '08:00 - 08:45',
        classroom: '经管#219'
      },
      // 添加更多课程数据
    ];
    // 更新 timeSlots 中的 classes 数据
    const timeSlots = this.data.timeSlots.map(slot => {
      return Object.assign({}, slot, {
        classes: classes.filter(cls => cls.class_time === slot.time)
      });
    });
    this.setData({ timeSlots });
  },
  importSchedule: function() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['pdf'],
      success: (res) => {
        const filePath = res.tempFiles[0].path;
        wx.uploadFile({
          url: 'http://yourserver.com/upload', // 替换为你的后端服务器地址
          filePath: filePath,
          name: 'file',
          success: (uploadRes) => {
            const data = JSON.parse(uploadRes.data);
            // 更新课程数据
            this.setData({ timeSlots: this.formatData(data) });
          },
          fail: (err) => {
            console.error('Upload failed', err);
          }
        });
      }
    });
  },
  formatData: function(data) {
    // 格式化从服务器返回的课程数据
    return this.data.timeSlots.map(slot => {
      return Object.assign({}, slot, {
        classes: data.filter(cls => cls.class_time === slot.time)
      });
    });
  }
});
