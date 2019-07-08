
**1.新建应用：**

    1.ng new angular-tour-of-heroes
    2.cd angular-tour-of-heroes
    3.ng serve --open
    4.ng generate component heroes
    
**2.添加Hero属性-string：**

    1.heroes.component.ts (hero property)
        hero = 'Windstorm';
    2.heroes.component.html
        {{hero}}
    3.src/app/app.component.html    --显示heroes视图
        <h1>{{title}}</h1>
        <app-heroes></app-heroes>
        
**3.添加Hero属性-Object：**

    1.新建对象：src/app/hero.ts
        export class Hero {
          id: number;
          name: string;
        }
    2.添加hero对象属性：heroes.component.ts
        heroObj: Hero = {
            id: 1,
            name: 'Windstorm'
          };
    3.heroes.component.html (HeroesComponent's template)
        <h2>{{heroObj.name}} Details</h2>
        <h2>{{heroObj.name | uppercase}} Details</h2>   //-->大写显示
        <div><span>id: </span>{{heroObj.id}}</div>
        <div><span>name: </span>{{heroObj.name}}</div>

**4.编辑英雄名称-双向绑定：**

    1.heroes.component.html
        <div>
          <label>name:
            <input [(ngModel)]="heroObj.name" placeholder="name"/>
          </label>
        </div>
    2.app.module.ts (FormsModule symbol import)
        import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
        imports: [
          BrowserModule,
          FormsModule
        ],
    
**5.添加Hero属性-Arrays[]**

    1.src/app/mock-heroes.ts
        import { Hero } from './hero';
        export const HEROES: Hero[] = [
          { id: 11, name: 'Dr Nice' },
          { id: 12, name: 'Narco' },
          { id: 13, name: 'Bombasto' },
          { id: 14, name: 'Celeritas' },
          { id: 15, name: 'Magneta' },
          { id: 16, name: 'RubberMan' },
          { id: 17, name: 'Dynama' },
          { id: 18, name: 'Dr IQ' },
          { id: 19, name: 'Magma' },
          { id: 20, name: 'Tornado' }
        ]; 
    2.src/app/heroes/heroes.component.ts (import HEROES)
        import { HEROES } from '../mock-heroes';
        heroes = HEROES;
    3.heroes.component.html (heroes template)
        <h2>My Heroes</h2>
        <ul class="heroes">
          <li *ngFor="let hero of heroes">
            <span class="badge">{{hero.id}}</span> {{hero.name}}
          </li>
        </ul>

**6.添加click事件绑定：**

    1.heroes.component.html (template excerpt)
        <h2>My Heroes</h2>
        <ul class="heroes">
          <li *ngFor="let hero of heroes"
            (click)="onSelect(hero)
            [class.selected]="hero === selectedHero"
            >
            <span class="badge">{{hero.id}}</span> {{hero.name}}
          </li>
        </ul>
    2.src/app/heroes/heroes.component.ts (onSelect)
        selectedHero: Hero;
        onSelect(hero: Hero): void {
          this.selectedHero = hero;
        }
    3.heroes.component.html (selected hero details)
        <div *ngIf="selectedHero">
          <h2>{{selectedHero.name | uppercase}} Details</h2>
          <div><span>id: </span>{{selectedHero.id}}</div>
          <div>
            <label>name:
              <input [(ngModel)]="selectedHero.name" placeholder="name"/>
            </label>
          </div>
        </div>

**7.拆出详情组件：**

    1.ng generate component hero-detail
    2.src/app/hero-detail/hero-detail.component.html
        <div *ngIf="hero">
          <h2>{{hero.name | uppercase}} Details</h2>
          <div><span>id: </span>{{hero.id}}</div>
          <div>
            <label>name:
              <input [(ngModel)]="hero.name" placeholder="name"/>
            </label>
          </div>
        </div>
    3.src/app/hero-detail/hero-detail.component.ts (import Hero)
        import { Component, OnInit, Input } from '@angular/core';
        import { Hero } from '../hero';
        @Input() hero: Hero;
    4.heroes.component.html (HeroDetail binding)
        <app-hero-detail [hero]="selectedHero"></app-hero-detail>
        
**8.做成服务-将数据访问放在服务中：**

    1.ng generate service hero
    2.src/app/hero.service.ts (new service)
        import { Hero } from './hero';
        import { HEROES } from './mock-heroes';
        getHeroes(): Hero[] {
          return HEROES;
        }
    3.src/app/heroes/heroes.component.ts (import HeroService)
        import { HeroService } from '../hero.service';
        import { Observable, of } from 'rxjs';
        heroes: Hero[]; 
        constructor(private heroService: HeroService) { }
        //getHeroes(): void {
        //  this.heroes = this.heroService.getHeroes();
        //}
        getHeroes(): Observable<Hero[]> {
          return of(HEROES);
        }
        ngOnInit() {
          this.getHeroes();
        }

**9.显示消息：--模拟缓存**

    1.ng generate component messages
    2./src/app/app.component.html
        <h1>{{title}}</h1>
        <app-heroes></app-heroes>
        <app-messages></app-messages>
    3.ng generate service message
    4./src/app/message.service.ts
        import { Injectable } from '@angular/core';
        @Injectable({
          providedIn: 'root',
        })
        export class MessageService {
          messages: string[] = [];
          add(message: string) {
            this.messages.push(message);
          }
          clear() {
            this.messages = [];
          }
        }
    5./src/app/hero.service.ts (import MessageService)
        import { MessageService } from './message.service';
        constructor(private messageService: MessageService) { }
        getHeroes(): Observable<Hero[]> {
          // TODO: send the message _after_ fetching the heroes
          this.messageService.add('HeroService: fetched heroes');
          return of(HEROES);
        }
    6./src/app/messages/messages.component.ts (import MessageService)
        import { MessageService } from '../message.service';
        constructor(public messageService: MessageService) {}
        //构造方法中必须是公共方法，私有的不能绑定到模板
    7.src/app/messages/messages.component.html
        <div *ngIf="messageService.messages.length">
          <h2>Messages</h2>
          <button class="clear"
                  (click)="messageService.clear()">clear</button>
          <div *ngFor='let message of messageService.messages'> {{message}} </div>
        </div>
        
**10.路由**