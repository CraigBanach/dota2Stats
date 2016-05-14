"use strict";

var express = require('express');

// Instantiate Express application
var app = express();

// serve static files from /views
app.use(express.static(__dirname + '/views'));

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});