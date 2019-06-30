import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  /*getHeroes(): Hero[] {
    return HEROES;
  }*/
  //修改为模拟Observe数据
  //在 HTTP 教程中，你将会调用 HttpClient.get<Hero[]>() 它也同样返回一个 Observable<Hero[]>，
  // 它也会发出单个值，这个值就是来自 HTTP 响应体中的英雄数组
  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }
  constructor() { }
}
