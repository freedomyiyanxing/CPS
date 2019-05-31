# CPS

商品推广系统前台

````html
 |-- build 工程构建文件
    |-- webpack-config.js  客户端打包文件
    |-- webpack-dll-config.js 第三包打包文件 (把第三方包 和 项目业务代码 分开 以节省打包时长)
 |-- src 项目人口文件 
 |-- static 静态资源, 不参与客户端打包,
 |-- .babelrc.js babel 配置文件
 |-- .editorconfig 编辑器配置文件 (vscode 需要安装editorconfig插件)
 |-- .eslintrc 工程代码eslint 配置文件 (不包括项目业务代码)
 |-- .gitignore git提交文件
 |-- package.json npm包文件
 |-- postcss.config.js style添加前缀文件
````

### 项目接受
项目工程采用： webpack4.x babel7.x eslint 搭建
项目采用 react, react-router, mobx, antd 搭建  

使用 eslint, react-arbnb 规范约束代码,

建议使用 yarn 安装包
