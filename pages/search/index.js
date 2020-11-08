/*
  1 输入框绑定值改变事件 input事件
    1 获取到输入框的值
    2 合法性判断
    3 检验通过把输入框的值发送到后台
    4 返回的数据打印到页面上
  2 防抖(防止抖动) 定时器 节流
    1 防抖:一般输入框中防止重复输入重复发送请求
    2 节流:一般是用在页面下拉和上拉
    3 定义全局定时器id
*/
import {request} from "../../request/index.js"
Page({
  data: {
    goods: [],
    // 取消按钮是否显示
    isFocus: false,
    // 输入框的值
    inpValue: ""
  },
  TimeId: -1,
  // 输入框的值改变,就会触发的事件
  handleInput(e) {
    // 1 获取输入框的值
    const {value} = e.detail;
    // 2 合法性检测
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      })
      // 值不合法
      return;
    }
    // 3 准备发送请求获取数据
    this.setData({
      isFocus: true
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000)
  },
  // 发送请求获取搜索建议数据
  async qsearch(query) {
    const res = await request({url: "/goods/qsearch", data: {query}});
    this.setData({
      goods: res
    })
  },
  // 点击取消按钮
  handleCancel() {
    this.setData({
      inpValue: "",
      isFocus: false,
      goods: []
    })
  }
})