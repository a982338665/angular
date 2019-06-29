import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes';

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
  heroes = HEROES;
  //添加事件
  //声明英雄对象属性Hero实际指实体类==>未初始化
  selectedHero: Hero;
  onSelect(hero: Hero  ): void {
    this.selectedHero = hero;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
