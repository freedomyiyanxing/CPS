# CPS

商品推广系统前台

````html
 |-- build 工程构建文件
    |-- webpack-dev-config.js  客户端打包文件
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

### 项目
````html
项目工程采用： webpack4.x babel7.x eslint 搭建

项目采用 react, react-router, mobx, material-ui 搭建
  
使用 js-in-css 样式书写

使用 eslint, react-arbnb 规范约束代码,

建议使用 yarn 安装包
````

操作
````html
 建议使用 yarn 操作本项目
 说明： 如果有遇到第三方包安装错误时, 一定是因为版本错误, 
 解决方案： 1、固定当前版本, 2、找到错误问题, 修改代码  (在不熟悉这个项目的情况下建议使用方案1)
 
 项目启动 以及打包命令
 1： yarn install (安装本项目所有依赖)
 2： yarn dev (开发时)
 3： yarn run build:test (测试环境打包)
 4:  yarn run build:pre (预环境 | 运行时环境)
````

注意事项
```html
rc-calendar  9.15.x 版本有BUG
在没有确定BUG已经被修复的情况下， 不要修改package.json的 rc-calendar 引用
https://github.com/react-component/calendar/issues/611
```
