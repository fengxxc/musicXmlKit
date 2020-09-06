# musicXmlKit
解析渲染MusicXml文本

## 使用
* 运行`npm install`安装依赖
* 运行`npm build` 打包编译，目标在./built下
* 前端页面引入上一步编译的文件
```javascript
const xml = `...`; // xml为MusicXml格式的文本
const root = Parser.parseMusicXml(xml); // 解析
const ctx = document.getElementById('can'); // canvas元素dom对象
Render.action(ctx, root); // 渲染
```
## 说明
目前为萌芽版，更多功能施工中……
