import { request } from "../../request/index.js";
import { login } from "../../utils/asyncWx.js"
Page({
  // 获取用户信息
  async handleGetUserInfo(e) {
    try {
      // 1 获取用户信息
      const {encryptedData, signature, rawData, iv} = e.detail;
      // 2 获取小程序登录成功的code
      const {code} = await login();
      const loginParams = {encryptedData, signature, rawData, iv, code}
      // 3 发送请求获取用户的token
      const {token} = await request({url: "/users/wxlogin", data: loginParams, method: 'post'});
      // 4 把token存入缓存 同时跳转回上一个页面
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
  }
})