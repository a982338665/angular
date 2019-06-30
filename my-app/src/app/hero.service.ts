import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService} from "./message.service";

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
    //修改 getHeroes 方法，在获取到英雄数组时发送一条消息。
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
  //这是一个典型的“服务中的服务”场景： 你把 MessageService 注入到了 HeroService 中，
  // 而 HeroService 又被注入到了 HeroesComponent 中。
  constructor(private messageService:MessageService) { }
}
