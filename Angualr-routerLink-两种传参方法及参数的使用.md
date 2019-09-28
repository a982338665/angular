
**1.路径：http://localhost:8080/#/product?id=1**

    <a [routerLink]="['/product']" [queryParams]="{id:1}">详情</a>
    ts获取查询参数：
    
    import { Component, OnInit } from "@angular/core";
    import { ActivatedRoute, Router } from "@angular/router";
     
    @Component({
      selector: 'app-product',
      templateUrl: './product.component.html',
      styleUrls: ['./product.component.css']
    })
    export class ProductComponent implements OnInit {
     
     
      private productId : number;
      constructor(private routeInfo:ActivatedRoute, private router: Router) {
     
      }
     
      ngOnInit() {
        //获取参数值
        this.productId = this.routeInfo.snapshot.queryParams['id'];
      }
     
      //跳转其他产品页
      goPage(){
         this.router.navigate(['/product'],{ queryParams: { id: 2 }});
      }
     
    }
**2. 路径：http://localhost:8080/#/product/1**
    
    <a [routerLink]="['/product',1]">产品</a>
    ts获取查询参数：
    
    import { Component, OnInit } from "@angular/core";
    import { ActivatedRoute, Params, Router } from "@angular/router";
     
    @Component({
      selector: 'app-product',
      templateUrl: './product.component.html',
      styleUrls: ['./product.component.css']
    })
    export class ProductComponent implements OnInit {
     
     
      private productId : number;
      constructor(private routeInfo:ActivatedRoute, private router: Router) {
     
      }
     
      ngOnInit() {
        //获取参数值
        this.productId = this.routeInfo.snapshot.params['id'];
        //另一种方式参数订阅
        this.routeInfo.params.subscribe((params: Params) => this.productId = params['id']);
     
      }
     
      //跳转其他产品页
      goPage(){
         this.router.navigate(['/product/2']);
      }
     
    }
    第二种方法需要配置路由：
    
    const routes: Routes =[
        {path: 'product/:id',component: ProductComponent}
    ]