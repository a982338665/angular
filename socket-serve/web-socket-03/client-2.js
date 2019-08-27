const WebSocket = require('ws');
const ws = new WebSocket('ws://127.0.0.1:3030');


ws.on('open',() =>{
    let msg = {type:'test',id:1}
    ws.send(JSON.stringify(msg));
})

ws.on('error', err => {
    console.log(err)
})

ws.on('message',data => {
    console.log(data)
})

ws.on('close',(code,reason) => {
    console.log(code);
    console.log(reason+'=========='+typeof reason)
})