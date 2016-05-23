"use strict";

require("./models/db");
var express = require('express');
var http = require("http");
var users = require("./models/users");

require("dotenv").config();

// Instantiate Express application
var app = express();

// Include routing in controllers folder
app.use(require('./controllers/controllers'));

// serve static files from /views
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

// Start server listening
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

users.searchForUser(123456);

/*
http.get("http://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id=2360891406&key="+ process.env.DOTA_2_KEY, function(res) {
    
    var output = "";
    
    res.on("data", function(chunk) {
        output += chunk;
    });
    
    res.on("end", function() {
        console.log(output);
    });
    
})
*/