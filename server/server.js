var express = require('express');
var app = express();
var ws = require("nodejs-websocket");
var fs = require("fs");
var http = require('http');
var httpProxy = require('http-proxy');

/**  Configurations **/
var expressPort = 8082;
var proxyPort = 8081;
var webSocketPort = 8001;

/**  Express **/
app.use('/DOA---Innojam2016', express.static('../'));

app.listen(expressPort, function () {
    console.log('Express server listening on port ' + expressPort);
});

/**  Proxy Server **/
var proxy = httpProxy.createProxyServer({});
var server = http.createServer(function (req, res) {
    try {
        console.log(req.url);
        if (req.url.indexOf('video') !== -1 || req.url.indexOf('audio.wav') !== -1) {
            proxy.web(req, res, {target: 'http://192.168.43.1:8080'});
        } else {
            proxy.web(req, res, {target: 'http://localhost:8082'});
        }
    } catch (e) {

    }
}).listen(process.env.PORT || 5000);
console.log("Proxy server listening on port " + proxyPort);

/**  Web Socket Server **/
    /*
var server = ws.createServer(function (connection) {
    connection.on("text", function (json) {
        console.log(json);
        broadcast(json);
    });
    connection.on("close", function () {
        broadcast("left");
    });
});
server.listen(webSocketPort);
console.log("Web socket listening on port " + webSocketPort);

function broadcast(str) {
    server.connections.forEach(function (connection) {
        connection.sendText(str)
    })
};*/