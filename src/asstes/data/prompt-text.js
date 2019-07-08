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
  emailSentPrompt,
  forgetPasswordPrompt,
  loginPrompt,
  resetPasswordPrompt,
  registerIndexPrompt,
  registerInfoPrompt,
};
