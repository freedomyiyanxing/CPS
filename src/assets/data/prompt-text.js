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
  phoneRequired: '电话号码必填',
  phoneFormat: '电话号码错误',
  withdrawRequired: '提现金额必填',
  withdrawMin: '提现金额 必须大于 系统可允许最小金额',
  withdrawMax: '提现金额 必须 <= 您的余额',
  withdrawNumber: '这不是一个有效的数字类型...',
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
  successText: '账户注册成功, 请稍等管理员同意',
  errorText: '服务器错误',
  agreement: '请同意用户协议',
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
  getLinksWarning: '当前商品已失效, 无法获取链接',
};

// 用户推广商品
const myProductPrompt = {
  deleteWarning: '请选中需要删除的商品',
  deleteSuccess: '删除成功...',
  downloadLinks: '成功 下载 links.xls',
  downloadLinksError: '当前选中的商品 都已经过期了 所以无法获取links',
  errorText: '服务器错误',
};

// 二次验证密码
const validPasswordPrompt = {
  validPasswordSuccess: '密码Ok',
  validPasswordError: '密码错误, 请重新输入',
};

// payment注册账号页面
const paymentPrompt = {
  deleteSuccess: 'paypal 账户 删除成功',
  addPaypalSuccess: 'paypal 添加成功',
  paypalLoginError: 'paypal 登录失败',
  addDirectSuccess: '银行账户添加成功',
};

// 提额页面
const withdrawPrompt = {
  withdrawSuccess: '提现成功 ... 请关注提额明细数据表',
  withdrawError: '提现失败',
  // (${xx} 表示动态值 切不需要翻译 比如说: 提现必须是每个月2号至月底)
  withdrawDateOne: start => `提现必须是每个月${start}号至月底`,
  // (${xx} 表示动态值 切不需要翻译 比如说: 提现必须是每个月2号至25号)
  withdrawDateTwo: (start, end) => `提现必须是每个月${start}号至${end}号`,
  // (${xx} 表示动态值 切不需要翻译 比如说: 提现必须是每个月2号)
  withdrawDateThree: val => `提现必须是每个月${val}号`,
};

// 信息提交失败
const tokenPrompt = {
  warningText: '登录信息失效, 请重新登录...',
};

const emailTokenPagePrompt = {
  title: '当前token错误',
  content: '导致当前错误的原因 大部分情况是因为你点击发送了多份邮件, 而你打开的邮件不是最后一次发送的邮件, 所以到Token匹配错误',
  btn: '回到注册页面',
};

// 联系我们页面
const contactUsPrompt = {
  success: '做完待在原地吧, 我也不知道改怎么做',
};

const errorText = '服务器错误, 请联系管理员';
const clientErrorText = '当前路径不存在 ---- !!';
const clientNetworkError = '当前网络错误';


export {
  formPrompt,
  emailSentPrompt,
  forgetPasswordPrompt,
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
  tokenPrompt,
  withdrawPrompt,
  emailTokenPagePrompt,
  clientErrorText,
  clientNetworkError,
  contactUsPrompt,
};
