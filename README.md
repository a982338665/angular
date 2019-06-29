# angular
**1.angular学习网址：**

    www.angular.cn/guide/quickstart
    ng-alain.com
    ng.ant.design/docs/introduce/zh
    
**2.使用前提：可参见www.angular.cn/guide/quickstart**
    
    1.安装node(8.x,10.x版本) node -v
    2.安装npm npm -v 
    3.安装angular cli:npm install -g @angular/cli
    
**3.使用：**

    1.创建工作区初始应用：若工具卡顿，则使用cmd初始化
        ng new my-app
        确认 y
    2.启动：
        cd my-app
        ng serve --open 
            (ng serve 会自动启动服务器并监视文件变化，修改文件时会重新构建应用)
            (--open(或 -o )会自动打开浏览器并访问 localhost:4200)
    3.编辑第一个angular组件:
        -1.cd  ./src/app/app.component.ts  --> 修改title保存访问浏览器
            export class AppComponent {
              title = 'My First Angular App!';
            }
        -2.cd ./src/app/app.component.css   --> 修改样式
            h1 {
              color: #369;
              font-family: Arial, Helvetica, sans-serif;
              font-size: 250%;
            }
    4.文件介绍:
          app.component.ts— 组件的类代码，这是用 TypeScript 写的。
          app.component.html— 组件的模板，这是用 HTML 写的。
          app.component.css— 组件的私有 CSS 样式。           
    5.创建英雄组件：
          -1.src/app/app.component.ts 
          -2.src/app/app.component.html
          -3.src/styles.css (excerpt)
          ————————
          -4.cd src/app
          -5.创建heroes新组件：ng generate component heroes
          -6.