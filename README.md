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
**4.英雄组件：**

    1.文件介绍:
          app.component.ts— 组件的类代码，这是用 TypeScript 写的。
          app.component.html— 组件的模板，这是用 HTML 写的。
          app.component.css— 组件的私有 CSS 样式。 
    2.插值绑定语法：{{title}}
        把组件ts文件中的属性值 绑定在 html 标签中          
    3.创建英雄组件：生成4个文件
          -1.src/app/app.component.ts 
          -2.src/app/app.component.html
          -3.src/styles.css (excerpt)   -->存放整个应用级别的样式
          ————————
          -4.cd src/app
          -5.创建heroes新组件：ng generate component heroes
          
**5.文件ts：**

    import { Component, OnInit } from '@angular/core';//导入
    @Component({    //@Component 是个装饰器函数，用于为该组件指定 Angular 所需的元数据
      selector: 'app-heroes',//CSS 元素选择器 app-heroes 用来在父组件的模板中匹配 HTML 元素的名称，以识别出该组件。
      templateUrl: './heroes.component.html',//模板文件位置
      styleUrls: ['./heroes.component.css']//私有css文件位置
    })
    //始终要 export 这个组件类，以便在其它地方（比如 AppModule）导入它。
    export class HeroesComponent implements OnInit {
      constructor() { }
      //ngOnInit 是一个生命周期钩子，Angular 在创建完组件后很快就会调用 ngOnInit。
      //这里是放置初始化逻辑的好地方。
      ngOnInit() {
      }
     }