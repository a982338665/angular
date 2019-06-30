import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  //缓存定义
  messages: string[] = [];

  //添加缓存
  add(message: string) {
    this.messages.push(message);
  }

  //清空缓存
  clear() {
    this.messages = [];
  }
}
