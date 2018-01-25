# Webpack 多页打包脚手架
#### webpack 打包需要两个环境（开发环境/生产环境）之前就因为这个踩了很多坑，现在将它分享给各位
#### 先看目录结构
 
* dist<br/>
&#8194;&#8194;--img<br/>
&#8194;&#8194;--js<br/>
&#8194;&#8194;--css<br/>
* src<br/>
&#8194;&#8194;--img<br/>
&#8194;&#8194;--js<br/>
&#8194;&#8194;--css<br/>
&#8194;&#8194;--font<br/>
&#8194;&#8194;--index.html<br/>
&#8194;&#8194;--index.js<br/>
&#8194;&#8194;--page_1.html<br/>
&#8194;&#8194;--page_1.js<br/>
* package.json<br/>
* webpack-dist.config.js &#8194;&#8194;生产环境配置<br/>
* webpack.config.js &#8194;&#8194;开发环境配置<br/>
* README.md<br/><br/>

#### 为啥要分两种环境？
##### 原因： 
1.我们在开发的时候要用到热更新（就是每次编辑代码浏览器自动刷新）这就需要一个虚拟服务器读文件所以涉及路径问题
我们不区分环境时候打包后的代码资源路径报错会找不到资源。<br/><br/>
2.还有某些插件要在最后build 的时候才可以用到比如压缩 抽离公共模块 路径的处理，如果不分环境每次npm run dev 时候都会启动浪费时间<br/><br/>
#### 如何根据不同的命令执行让webpack 识别我们是在打包还是开发？
##### 方法： 
1.首先建立两个配置 <br/>
&#8194;&#8194;webpack.config,js &#8194;&#8194;--开发环境<br/>
&#8194;&#8194;webpack-dist.config,js &#8194;&#8194;--生产环境<br/><br/>
2.在package.json 中修改启动后的映射如下
``` javaScirpt
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --devtool eval-source-map --progress --colors --config webpack.config.js --hot --inline --content-base ./dist",
    "build": "webpack --progress --colors --config webpack-dist.config.js"
  },
```
2.1. 在执行 npm run dev 映射到webpack.config.js 同时启动 webpack-dev-server 这个热更新插件（调试服务器）<br/>
2.2. 在执行 npm run build 映射webpack-dist.config.js 执行打包是需要的插件并打包输出<br/>
##### 注释： 
##### 两个环境中最大的区别是路径的解析
##### 请仔细对比求中差异
##### 有事啊不懂 qq:313282038 

