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
  heroes = Hero[10];
  //添加事件
  //声明英雄对象属性Hero实际指实体类==>未初始化
  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  //这个参数同时做了两件事：1. 声明了一个私有 heroService 属性，2. 把它标记为一个 HeroService 的注入点。
  // 当 Angular 创建 HeroesComponent 时，依赖注入系统就会把这个 heroService 参数设置为 HeroService 的单例对象。
  constructor(private heroService: HeroService) {
  }

  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }

  ngOnInit() {
    this.getHeroes();
  }

}
