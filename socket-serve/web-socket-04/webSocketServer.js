const express = require('express');

const http = require('http');

const url = require('url');

const WebSocket = require('ws');



const app = express();



/**

 * WebSocket服务端例子

 *  框架：https://github.com/websockets/ws

 */


app.use(function (req, res) {

    res.send({msg: "hello"});

});



const server = http.createServer(app);

//noinspection JSAnnotator

const wss = new WebSocket.Server({server});

const wsList = {};

testWebSocketServerApi();

function testWebSocketServerApi() {

    wss.on('connection', function connection(ws, req) {

        const location = url.parse(req.url, true);

        const ip = req.connection.remoteAddress;

        const port = req.connection.remotePort;

        console.log(ip + " " + port);

        ws.on('message', function (message) {
            let msg = JSON.parse(message);
            // console.log('received: %s',msg);
            if(msg.type == 1){
                console.error('--------1')
            }else if(msg.type == 2){
                console.error('========2')
            }
            if(msg.usercode){
                console.log('received: %s',msg.usercode);
                wsList[msg.usercode] = ws;
            }
            if(msg.msgbody && msg.receiveuser){
                console.log('msgbody: %s',msg.msgbody);
                console.log('receiveuser: %s',msg.receiveuser);
                sendMsg(msg);
            }
            // wsList.push({userCode:msg.usercode,ws:ws});
        });
        // console.log('ws.id',ws);

        ws.on('close', function (message) {

            console.log('params: %s', message);

        });

        // ws.send('something1');

    });

    server.listen(5888, function listening() {

        console.log('WebSocket Listening on %d', server.address().port);

    });

}
function sendMsg(msgBody) {
    console.log("发送站内信给用户："+msgBody.receiveuser+"，内容为=======>"+msgBody.msgbody);
    let toUserCodeList = msgBody.receiveuser;
    toUserCodeList.forEach(item => {
        let ws;
        if(ws = wsList[item]){
            ws.send(JSON.stringify(msgBody.msgbody) );
        }
    });

}