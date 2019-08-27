const WebSocket = require('ws');
const wss = new WebSocket.Server({port:3030})
const connection = {}

wss.on('connection',ws => {
    ws.on('message',message => {
        console.log(JSON.stringify(connection))
        message = JSON.parse(message)
        if(message.type === 'test') {
            connection[message.id] = ws
            console.log(connection)
            console.log('received: %s',JSON.stringify(message))
            if(connection[message.id])
                connection[message.id].send(JSON.stringify(message))
        }else {
            ws.clients.forEach(function each(client) {
                client.send(message);
            });
        }

    });
})