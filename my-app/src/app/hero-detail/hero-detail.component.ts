import { Component, OnInit,Input} from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService }  from '../hero.service';
// 当路由器会在响应形如 ~/detail/11 的 URL 时创建 HeroDetailComponent。
// HeroDetailComponent 需要从一种新的途径获取要显示的英雄。
// 获取创建本组件的路由，
// 从这个路由中提取出 id
// 通过 HeroService 从服务器上获取具有这个 id 的英雄数据。
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;
  //然后把 ActivatedRoute、HeroService 和 Location 服务注入到构造函数中，将它们的值保存到私有变量里：
  constructor(
    private route: ActivatedRoute,//URL 中提取的路由参数
    private heroService: HeroService,//HeroService 从远端服务器获取英雄数据，本组件将使用它来获取要显示的英雄。
    private location: Location//location 是一个 Angular 的服务，用来与浏览器打交道。 稍后，你就会使用它来导航回上一个视图。
  ) { }

  ngOnInit() {
    this.getHero();
  }

  // route.snapshot 是一个路由信息的静态快照，抓取自组件刚刚创建完毕之后。
  // paramMap 是一个从 URL 中提取的路由参数值的字典。 "id" 对应的值就是要获取的英雄的 id。
  // 路由参数总会是字符串。 JavaScript 的 (+) 操作符会把字符串转换成数字，英雄的 id 就是数字类型。
  // 刷新浏览器，应用挂了。出现一个编译错误，因为 HeroService 没有一个名叫 getHero() 的方法。 这就添加它。
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  //在组件类中添加一个 goBack() 方法，利用你以前注入的 Location 服务在浏览器的历史栈中后退一步。
  goBack(): void {
    this.location.back();
  }
}
