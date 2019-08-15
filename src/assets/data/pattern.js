const patterns = {
  personName: /^[A-Za-z\s.-]{2,30}$/, // 允许大小写字母各种空格.- 2||30个字符之间
  productName: /^[\w\s-~\\.]+$/, // 允许数字、字母大小写、空格、.、~、— 至少一次
  websiteDesc: /^[\w\s\\.\-+=:;,$?()!%'"/|*]{2,200}$/, // s
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~^$@$!%*#?&\-_]{6,20}$/,
};

export {
  patterns,
};
