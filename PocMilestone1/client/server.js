var connect = require('connect');
var serveStatic = require('serve-static');
 
var port = 8081;
console.log('listening on: localhost/' + port);
connect().use(serveStatic(__dirname)).listen(port);
