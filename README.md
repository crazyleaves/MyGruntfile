## grunt-init-gruntfile

这是我的grungtfile的模板，  
Windows通过下面的方式下载到本地。  

```
git clone https://github.com/crazyleaves/MyGruntfile.git ~/.grunt-init/xxxxx
```
xxxxx可以随便取个什么名字  
Windows用户, 在根目录下的.grunt-init能够看到下载过来的配置包  

## 使用

使用方法如下，到对应的项目目录下

```
grunt-init xxxxx
```
初始化成功之后，本地目录结构为：
```
src  //这个是你的工作目录
  --css  //css文件
    --a.css
    --b.css
  --js //js文件 
    --a.js
    --b.js
```
下面这两个文件是init后出来的文件。
```
Gruntfile.js
package.json
```.
然后使用
```
npm install
```
会出现新文件目录 node_modules
```
grunt
```
会出现build目录。
that's all
