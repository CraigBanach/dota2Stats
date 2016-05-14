"use strict";

var http = require("http");
var express = require('express');
require("dotenv").config();

// Instantiate Express application
var app = express();

// serve static files from /views
app.use(express.static(__dirname + '/views'));

// Start server listening
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

console.log(process.env.DOTA_2_KEY);

http.get("http://api.steampowered.com/IDOTA2Match_205790/GetMatchHistory/V001/?key=" + process.env.DOTA_2_KEY, function(res) {
    
    var output = "";
    
    res.on("data", function(chunk) {
        output += chunk;
    });
    
    res.on("end", function() {
        console.log(output);
    });
    
})