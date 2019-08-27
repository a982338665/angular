// import {Server} from 'ws';
const {Server}=require('ws');
const wsServer = new Server({port:8085});
//当有任何一个客户端连接到服务器时，给这个客户端推送一条消息
wsServer.on("connection",websocket => {
    websocket.send("这个消息是服务器主动推送的");
});