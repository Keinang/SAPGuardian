var express = require('express');
var app = express();
var ws = require("nodejs-websocket");
var fs = require("fs");
var http = require('http');
var httpProxy = require('http-proxy');
var WebSocketServer = require("ws").Server;

/**  Configurations **/
var expressPort = 8082;
var proxyPort = 8081;
var wsPort = 5000;
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
            proxy.web(req, res, {target: 'http://localhost:' + expressPort});
        }
    } catch (e) {

    }
}).listen(process.env.PORT || proxyPort);
console.log("Proxy server listening on port " + (process.env.PORT || proxyPort));