
**1.使用：**

    注意：配合 formControlName 作为属性使用
    
**2.html:**
    
    添加: nz-form [formGroup]="searchForm" 表示要转换为form表单,配合formControlName="contract1"属性取值
     <div nz-form [formGroup]="searchForm" style="display: flex;flex-direction: row;width: 100%;"><span style="width:200px;">
     需求方：</span><input formControlName="contract1"
                nz-input 
                placeholder="请输入需求方"/><span style="width:200px;margin-left: 10px;">需求标题：</span>
            <input nz-input formControlName="contract2"
                   placeholder="请输入需求标题"/>
            <button nz-button class="release-btn" style="margin-left: 10px;height: 35px;width: 150px;"
                    (click)="selectList()">查询
            </button>
     </div>    
    
**3.ts文件：**

    添加属性变量：
    export class ManageOrderComponent implements OnInit {
        searchForm: FormGroup;
        constructor(
        ) {
            this.searchForm = fb.group({
                contact1: [null],
                contact2: [null],
            });
        }
        selectList(){
            console.error(this.searchForm.controls.contact.value+"|"+this.searchForm.controls.contact1.value)
        }
    }
    