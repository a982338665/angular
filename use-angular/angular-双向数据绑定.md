

**1.使用：**

    注意：不能和 formControlName 一起作为属性存在
    
**2.html:**
    
    添加: [(ngModel)]="searchRequirementer"
     <div style="display: flex;flex-direction: row;width: 100%;"><span style="width:200px;">需求方：</span><input
                nz-input [(ngModel)]="searchRequirementer"
                placeholder="请输入需求方"/><span style="width:200px;margin-left: 10px;">需求标题：</span>
            <input nz-input [(ngModel)]="searchRequirementTitle"
                   placeholder="请输入需求标题"/>
            <button nz-button class="release-btn" style="margin-left: 10px;height: 35px;width: 150px;"
                    (click)="selectList()">查询
            </button>
     </div>    
    
**3.ts文件：**

    添加属性变量：
    export class ManageOrderComponent implements OnInit {
        searchRequirementer;
        searchRequirementTitle;
        selectList(){
            console.error(this.searchRequirementer+"|"+this.searchRequirementTitle)
            this.searchRequirementTitle = '123';
        }
    
    }
    