// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
    server
});

var count = 0;

function broadcastMessage(msg) {
    for (let client of wss.clients) {
        client.send(JSON.stringify(msg));
    }
}



function handleMessage(message) {

    var uuid = uuidv1();

    var grab = JSON.parse(message);

    var msg = {
        key: uuid,
        type: grab.type,
        oldusername: grab.oldusername,
        username: grab.username,
        content: grab.content,
        count: count
    };

    broadcastMessage(msg);
}

wss.on('connection', function(client) {
    var uuidConnect = uuidv1()

    count++;
    var usercount = {
        key: uuidConnect,
        type: "connected",
        count: count
    }

    broadcastMessage(usercount)

    client.on('close', function() {
        var uuidDisconnect = uuidv1()

        count--;
        usercount = {
            key: uuidDisconnect,
            type: "disconnected",
            count: count
        }

        broadcastMessage(usercount)
    })
    client.on('message', handleMessage);
})

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.