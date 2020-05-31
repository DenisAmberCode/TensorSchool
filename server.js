var express = require('express');
var jsonServer = require('json-server');


var srv = express();

srv.use(express.static('public'));

// https://github.com/typicode/json-server
srv.use('/api', jsonServer.defaults(), jsonServer.router('db.json'));

let server = srv.listen(8080, function () {
    console.log('Server listening on port 8080');
});