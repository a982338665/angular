import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

//路由配置：URL 为 localhost:4200/heroes 时，就导航到 HeroesComponent。
const routes: Routes = [
  //参数化路由指向 英雄详情
  { path: 'detail/:id', component: HeroDetailComponent },
  ////添加仪表盘路由
  { path: 'dashboard', component: DashboardComponent },
  //添加默认路由：这个路由会把一个与空路径“完全匹配”的 URL 重定向到路径为 '/dashboard' 的路由。
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
