// 表单验证错误提示语
const formPrompt = {
  emailRequired: '邮箱必填',
  emailFormat: '邮箱格式错误',
  emailValidator: '邮箱已经存在',
  passwordRequired: '密码是必填的',
  passwordFormat: '密码格式错误',
  passwordValidator: '两次输入的密码不一致',
  advertisingFormat: '佣金 我们需要有效的 数字',
  advertisingEnd: '佣金 比例 不许 超过 100%',
  advertisingStart: '起始佣金必须 小于 结尾佣金',
};

// 发送邮件页面
const emailSentPrompt = {
  successText: '邮件发送成功, 请打开邮箱点击进入重置密码页面',
};

// 忘记密码页面
const forgetPasswordPrompt = {
  successText: '邮件发送成功, 请打开邮箱点击进入重置密码页面',
  errorText: '服务器错误',
};

// 登录页面
const loginPrompt = {
  errorText: '服务器错误',
};

// 重置密码成功页面
const resetPasswordPrompt = {
  successText: '密码重置成功 请用新密码登录',
  errorText: '服务器错误',
};

// 注册页面
const registerIndexPrompt = {
  successText: '注册成功 邮件发送成功, 请耐心等待 --- OK',
  errorText: '服务器错误',
};

// 注册添加个人信息页面
const registerInfoPrompt = {
  successText: '个人信息填写成功 --- OK',
  errorText: '服务器错误',
};


export {
  formPrompt,
  emailSentPrompt,
  forgetPasswordPrompt,
  loginPrompt,
  resetPasswordPrompt,
  registerIndexPrompt,
  registerInfoPrompt,
};
