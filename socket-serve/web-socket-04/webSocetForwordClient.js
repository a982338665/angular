const WebSocket = require('ws');
// const wsconfig = require('../config/wsconfig');

let is_open = false;
let ws ;
let mqList = [];
function getws() {
    if(ws){
        return ws;
    }else {
        ws = new WebSocket('ws://localhost:5888');
        ws.on('open', function open() {
            is_open = true;
            mqList.forEach(function (item,index) {
                forwordNew(item.receiveuser,item.msgbody,item.type)
            });
            mqList = [];
        });
        ws.on("message", function(data) {
            console.log(data);
        });
        return ws;
    }
}

function forword(receiveuser,msgbody){
    let ws = getws();
    let data = {
        "receiveuser":receiveuser,
        "msgbody":msgbody
    };
    if(is_open){
        let dataStr = JSON.stringify(data);
        console.error('发送数据：----'+dataStr);
        ws.send(dataStr);
    }else{
        mqList.push({"receiveuser":receiveuser,"msgbody":msgbody})
    }

}


function forwordNew(receiveuser,msgbody,type){
    let ws = getws();
    let data = {
        "type":type,
        "receiveuser":receiveuser,
        "msgbody":msgbody
    };
    if(is_open){
        let dataStr = JSON.stringify(data);
        ws.send(dataStr);
    }else{
        mqList.push({"receiveuser":receiveuser,"msgbody":msgbody,"type":type})
    }

}

exports.forword = forword;
exports.forwordNew = forwordNew;