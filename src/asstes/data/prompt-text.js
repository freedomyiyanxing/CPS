// 表单验证错误提示语
const formPrompt = {
  emailRequired: '邮箱必填',
  emailFormat: '邮箱格式错误',
  emailValidator: '邮箱已经存在',
  passwordRequired: '密码是必填的',
  passwordFormat: '密码格式错误',
  passwordValidator: '两次输入的密码不一致',
  passwordOld: '原始密码与新秘密 请不要保持一致',
  advertisingFormat: '佣金 我们需要有效的 数字',
  advertisingEnd: '佣金 比例 不许 超过 100%',
  advertisingStart: '起始佣金必须 小于 结尾佣金',
  priceFormat: '开始价格 我们需要有效的 数字',
  priceValidator: '起始价格必须 小于 结尾价格',
  urlRequired: '我们需要 你网站的 地址',
  urlFormat: '网址不正确 或者含有非法的字符',
  nameRequired: '我们需要你的名字',
  nameFormat: '我们需要有效的字符(A-Z a-z) 特殊字符只限(. -) 字数(2 - 30) 之间',
  textareaRequired: '我们需要 你网站的详细信息',
  textareaFormat: '我们需要有效的字符(A-Z a-z) 字数(2 - 200) 之间',
  selectRequired: '我们需要 你选择类别',
  dateOne: '无效的日期, 在判断2月不可能 有30天 时 报错',
  dateTwo: '无效的日期, 在判断大小月份时 报错',
  dateThree: '无效的日期 , 出生日期 不可能在今天 或者 以后',
  dateFour: '无效的日期 在判断闰年时报错',
  phoneRequired: '电话号码必填',
  phoneFormat: '电话号码错误',
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

// 修改个人信息页面
const userInfoPrompt = {
  successText: '个人信息修改成功',
  errorText: '服务器错误',
};

// 个人账户修改密码页面
const userSetPassword = {
  successText: '密码修改成功 请用新密码登录',
  errorText: '服务器错误',
};

// 退出登录
const logoutPrompt = {
  successText: '退出登录',
  errorText: '服务器错误',
};

// 图片上传
const userIconPrompt = {
  successText: '图像上传成功',
  warningText: '无效的裁剪',
  errorText: '服务器错误',
};

// 推广商品
const productPrompt = {
  addProductSuccess: '已经加入你的推广商品列表',
  addProductError: '加入你的推广商品列表失败',
  copyLinksSuccess: '复制链接成功',
  copyLinksError: '链接 生成 失败',
};

// 用户推广商品
const myProductPrompt = {
  deleteSuccess: '删除成功...',
  downloadLinks: '成功 下载 links.xls',
  errorText: '服务器错误',
};

const validPasswordPrompt = {
  validPasswordSuccess: '密码Ok',
  validPasswordError: '密码错误, 请重新输入',
};

const paymentPrompt = {
  deleteError: 'paypal 账户 删除失败',
  deleteSuccess: 'paypal 账户 删除成功',
  addPaypalSuccess: 'paypal 添加成功',
  paypalLoginError: 'paypal 登录失败',
  paypalDateError: 'paypal 数据更新不及时 请刷新 F5',
};

const errorText = '服务器错误, 请联系管理员';


export {
  formPrompt,
  emailSentPrompt,
  forgetPasswordPrompt,
  loginPrompt,
  resetPasswordPrompt,
  registerIndexPrompt,
  registerInfoPrompt,
  userInfoPrompt,
  userSetPassword,
  logoutPrompt,
  userIconPrompt,
  productPrompt,
  myProductPrompt,
  validPasswordPrompt,
  paymentPrompt,
  errorText,
};
