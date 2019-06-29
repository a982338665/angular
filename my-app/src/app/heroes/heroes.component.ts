import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';

//@Component 是个装饰器函数，用于为该组件指定 Angular 所需的元数据

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  //添加hero属性
  hero1 = "hero1";
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor() {
  }

  ngOnInit() {
  }

}
