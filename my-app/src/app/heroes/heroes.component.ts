import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
// import {HEROES} from '../mock-heroes';
import {HeroService} from '../hero.service';

//@Component 是个装饰器函数，用于为该组件指定 Angular 所需的元数据

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  //添加hero属性
  // hero1 = "hero1";
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };
  heroes: Hero[] = [];
  //添加事件
  //声明英雄对象属性Hero实际指实体类==>未初始化
  // selectedHero: Hero;

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }

  //这个参数同时做了两件事：1. 声明了一个私有 heroService 属性，2. 把它标记为一个 HeroService 的注入点。
  // 当 Angular 创建 HeroesComponent 时，依赖注入系统就会把这个 heroService 参数设置为 HeroService 的单例对象。
  //往构造函数中添加一个私有的 heroService，其类型为 HeroService。
  //让构造函数保持简单，只做初始化操作，比如把构造函数的参数赋值给属性。 构造函数不应该做任何事。
  constructor(private heroService: HeroService) {
  }

  getHeroes(): void {
    //this.heroService.getHeroes()的函数签名是同步的，此时数据是模拟数据可同步获取，当进行网络访问的时候
    //HeroService必须要等待服务器给出响应，此处需要修改为异步函数签名
    //它可以使用回调函数，可以返回 Promise（承诺），也可以返回 Observable（可观察对象）。
    //这节课，HeroService.getHeroes() 将会返回 Observable，因为它最终会使用 Angular 的 HttpClient.get 方法来获取英雄数据，
    // 而 HttpClient.get() 会返回 Observable。
    // this.heroes = this.heroService.getHeroes();
    //新的版本等待 Observable 发出这个英雄数组，这可能立即发生，也可能会在几分钟之后。 然后，
    // subscribe 函数把这个英雄数组传给这个回调函数，该函数把英雄数组赋值给组件的 heroes 属性
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

}
