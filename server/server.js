var express = require('express');
var app = express();
var fs = require("fs");
var http = require('http');
var httpProxy = require('http-proxy');

/**  Configurations **/
var expressPort = 8082;
var proxyPort = 5000;

/**  Express **/
app.use('/DOA---Innojam2016', express.static('../'));

app.listen(process.env.PORT || expressPort, function () {
    console.log('Express server listening on port ' + expressPort);
});
var okScreen = {state: false};
app.get('/getOkScreen', function (req, res) {
    res.send(JSON.stringify(okScreen));
});

app.post('/setOkScreenTrue', function (req, res) {
    okScreen.state = true;
    res.send(JSON.stringify(okScreen));
});

app.post('/setOkScreenFalse', function (req, res) {
    okScreen.state = false;
    res.send(JSON.stringify(okScreen));
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