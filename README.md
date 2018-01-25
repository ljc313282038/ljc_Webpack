# Webpack 多页打包脚手架
#### webpack 打包需要两个环境（开发环境/生产环境）之前就因为这个踩了很多坑，现在将它分享给各位
#### 先看目录结构
 
* dist<br/><br/>
&#8194;&#8194;--img<br/>
&#8194;&#8194;--js<br/>
&#8194;&#8194;--css<br/><br/>
* src<br/><br/>
&#8194;&#8194;--img<br/>
&#8194;&#8194;--js<br/>
&#8194;&#8194;--css<br/>
&#8194;&#8194;--font<br/><br/>
* index.html &#8194;首页html<br/><br/>
* index.js &#8194;&#8194;首页入口js<br/><br/>
* page_1.index &#8194;&#8194;其他页面html<br/><br/>
* page_i.js &#8194;&#8194;其他页面入口js<br/><br/>
* package.json<br/><br/>
* webpack-dist.config.js &#8194;&#8194;生产环境配置<br/><br/>
* webpack.config.js &#8194;&#8194;开发环境配置<br/><br/>
* README.md<br/><br/>
    
