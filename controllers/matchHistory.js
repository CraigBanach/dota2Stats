"use strict";

var express = require("express");
var router = express.Router();
var request = require("request");
//var users = require("../models/users");
var fs = require("fs");

router.post("/", function(req, res) {
    console.log("AJAX received");
    getMatchHistory(req.user._json.steamid);
    res.send(req.user);
});

function getMatchHistory(userID) {
    //console.log(userID);
    //console.log(userID - 76561197960265728);
    userID = userID - 76561197960265728;
    var url = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=" + process.env.DOTA_2_KEY + "&account_id=" + userID;
    request(url, function(error, response, body) {
        if (error) console.log(error + "this is an error");
        //console.log(body);
        fs.writeFile("File", body, function(err) {
            if (err) console.log(err);
            console.log(response.statusCode);
            console.log(response.statusMessage);
        });
        //console.log("request1");
    });
}

module.exports = router;