import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api
  /*getHeroes(): Hero[] {
    return HEROES;
  }*/
  //修改为模拟Observe数据
  //在 HTTP 教程中，你将会调用 HttpClient.get<Hero[]>() 它也同样返回一个 Observable<Hero[]>，
  // 它也会发出单个值，这个值就是来自 HTTP 响应体中的英雄数组
  // getHeroes(): Observable<Hero[]> {
  //   //修改 getHeroes 方法，在获取到英雄数组时发送一条消息。
  //   this.messageService.add('HeroService: fetched heroes');
  //   return of(HEROES);
  // }
  /** GET heroes from the server */
  // 窥探Observable:HeroService 的方法将会窥探 Observable 的数据流，并通过 log() 函数往页面底部发送一条消息。
  // 它们可以使用 RxJS 的 tap 操作符来实现，该操作符会查看 Observable 中的值，使用那些值做一些事情，
  // 并且把它们传出来。 这种 tap 回调不会改变这些值本身。
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }


  // getHero(id: number): Observable<Hero> {
  //   //修改 getHeroes 方法，在获取到英雄数组时发送一条消息。
  //   this.messageService.add(`HeroService: fetched hero id = ${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }
  /** GET hero by id. Will 404 if id not found */
  //api/heroes/11
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  //
  /** PUT: update the hero on the server */
  //HttpClient.put() 方法接受三个参数
  // URL 地址
  //   要修改的数据（这里就是修改后的英雄）
  //   选项
  //   options
  // URL 没变。英雄 Web API 通过英雄对象的 id 就可以知道要修改哪个英雄。
  // 英雄 Web API 期待在保存时的请求中有一个特殊的头。 这个头是在 HeroService 的 httpOptions 常量中定义的
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  //这是一个典型的“服务中的服务”场景： 你把 MessageService 注入到了 HeroService 中，
  // 而 HeroService 又被注入到了 HeroesComponent 中。
  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  // 保留对 MessageService 的注入。你将会频繁调用它，因此请把它包裹进一个私有的 log 方法中。
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  //下面这个 handleError() 将会在很多 HeroService 的方法之间共享，所以要把它通用化，以支持这些彼此不同的需求。
  // 它不再直接处理这些错误，而是返回给 catchError 返回一个错误处理函数。还要用操作名和出错时要返回的安全值
  // 来对这个错误处理函数进行配置。
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
}
