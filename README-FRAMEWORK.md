# 架构

**1.架构概览：**

    1.Angular构成：HTML+TypeScript 构成客户端应用的平台与框架
    2.基本构造：NgModule 为组件提供了编译的上下文环境
    3.基本结构：
        至少一个根模块 + 更多特性模块
            1.组件定义视图：
            2.组件使用服务：服务提供商可作为依赖被注入到组件中
        优点：
            代码更加模块化、更加可复用、更加高效。

**2.NgModule：**
    
    1.根模块：app.module.ts     -每个项目至少有一个，引导此模块可启动应用
    2.对应类：AppModule
        import { NgModule }      from '@angular/core';
        import { BrowserModule } from '@angular/platform-browser';  
        @NgModule({
          imports:      [ BrowserModule ],  导入需要的其他模块
          providers:    [ Logger ],         面向全局提供的服务(此项目中均可使用)
          declarations: [ AppComponent ],   申明组件
          exports:      [ AppComponent ],   根模块没有任何理由导出任何东西，因为其它模块永远不需要导入根模块。
          bootstrap:    [ AppComponent ]    应用的主视图，称为根组件。它是应用中所有其它视图的宿主。只有根模块才应该设置这个 bootstrap 属性。
        })
        export class AppModule { }
        
**3.**