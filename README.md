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
     
**6.Angular 模板语法的五个常用特性：**
    
    *ngFor
    *ngIf
    插值表达式 {{}}
    属性绑定 []
    事件绑定 ()
   
**7.创建主从组建:将英雄的详情移入一个独立的、可复用的 HeroDetailComponent**

    1.生成新组件:ng generate component hero-detail
    2.父组件引用子组件并进行属性赋值
    
**8.服务：**

    1.创建服务：ng generate service hero -> 该命令会在 src/app/hero.service.ts 中生成 HeroService 类的骨架
    2.hero.service.ts文件内容：
        import { Injectable } from '@angular/core';
          //@Injectable() 装饰器会接受该服务的元数据对象，就像 @Component() 对组件类的作用一样。
          //默认情况下，Angular CLI 命令 ng generate service 会通过给 @Injectable 
          //装饰器添加元数据的形式，用根注入器将你的服务注册成为提供商。
          //当你在顶层提供该服务时，Angular 就会为 HeroService 创建一个单一的、共享的实例，
          //并把它注入到任何想要它的类上。
          //在 @Injectable 元数据中注册该提供商，还能允许 Angular 通过移除那些完全没有用过的服务来进行优化。
          @Injectable({ //@Injectable装饰器，把这个类标记为依赖注入系统的参与者之一
            providedIn: 'root'
          })
          export class HeroService {
            constructor() { }
          }
    3.从组件中移除数据访问逻辑：实现方式写在service中
    4.显示消息：
        ·添加一个 MessagesComponent，它在屏幕的底部显示应用中的消息。
        ·创建一个可注入的、全应用级别的 MessageService，用于发送要显示的消息。
        ·把 MessageService 注入到 HeroService 中。
        ·当 HeroService 成功获取了英雄数据时显示一条消息。
        创建MessagesComponent：ng generate component messages
        创建MessagesService：ng generate service message

**9.路由：**
    
    1.在 Angular 中，最好在一个独立的顶级模块中加载和配置路由器，
      它专注于路由功能，然后由根模块 AppModule 导入它：
      ng generate module app-routing --flat --module=app
        --flat 把这个文件放进了 src/app 中，而不是单独的目录中。
        --module=app 告诉 CLI 把它注册到 AppModule 的 imports 数组中。
    2.添加路由定义:
      路由定义 会告诉路由器，当用户点击某个链接或者在浏览器地址栏中输入某个 URL 时，要显示哪个视图。
      典型的 Angular 路由（Route）有两个属性：
          path：一个用于匹配浏览器地址栏中 URL 的字符串。
          component：当导航到此路由时，路由器应该创建哪个组件。
      如果你希望当 URL 为 localhost:4200/heroes 时，就导航到 HeroesComponent。
      首先要导入 HeroesComponent，以便能在 Route 中引用它。 然后定义一个路由数组，
      其中的某个路由是指向这个组件的。
    3.添加仪表盘视图：
        1.ng generate component dashboard
        
**10.http：**

    1.借助 Angular 的 HttpClient 来添加一些数据持久化特性。
        HeroService 通过 HTTP 请求获取英雄数据。
        用户可以添加、编辑和删除英雄，并通过 HTTP 来保存这些更改。
        用户可以根据名字搜索英雄。
    2.模拟安装内存服务端：
        1.从 npm 中安装这个内存 Web API 包（译注：请使用 0.5+ 的版本，不要使用 0.4-）
            npm install angular-in-memory-web-api --save
        2.生成新文件替换原来模拟数据文件：InMemoryData -> mock-heroes.ts
            ng generate service InMemoryData
        3.

**11.导入angular/node项目注意事项：**

    1.git clone 项目
    2.open 项目
    3.设置项目为angular项目：
        settings -->
            【javascript】      --> ES6
            【node.js and npm】 --> Enable 指定该项目
    4.根据package.json生成npm包：重新导入后可在【node.js and npm】中查看
        进入项目目录: npm install --production
        或者
        项目右键 -->  rebuild module 项目名 重新导入npm 包
    5.【node.js and npm】中显示的有些包是全局npm包，若移除则等同于全局卸载
    