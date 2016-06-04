"use strict";

var express = require("express");
var router = express.Router();
var request = require("request");
var matchesDB = require("../models/matches");
var BigNumber = require("bignumber.js");

router.post("/", function(req, res) {
    console.log("AJAX received");
    getMatchHistory(new BigNumber(req.user._json.steamid));
    res.send(req.user);
});

/**
 * Cannot work out how to make this function common to both 
 * steamlogon.js & matchHistory.js, so for this instance am
 * violating DRY principles in order to have workign code.
 */

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
};

router.get("/show", ensureAuthenticated, function(req, res) {
    res.render("matchHistory.ejs");    
});

function getMatchHistory(userID) {
    //console.log(userID);
    //console.log(userID - 76561197960265728);
    userID = userID.minus(new BigNumber(process.env.DOUBLELENGTH));

    var url = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=" + process.env.DOTA_2_KEY + "&account_id=" + userID + "&matches_requested=500";
    request(url, function(error, response, body) {
        if (error) console.log(error + "this is an error");

        if (response.statusCode != 200) {
            console.log("The dota2API returned: \nStatus Code:\t" + response.statusCode + "\nMessage:\t" + response.statusMessage);
        } else {
            addNewMatchesToDB(JSON.parse(body).result.matches);
        }
    });
}

function addNewMatchesToDB(matches) {
    matches.filter(function(match) {
        matchesDB.findMatch(match.match_id, function(data) {
            data.length == 0 ? matchesDB.addMatch(match) : null;
        });
    });
}

module.exports = router;