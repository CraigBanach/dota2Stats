var express = require("express");
var router = express.Router();
var request = require("request");

router.post("/", function(req, res) {
    console.log("AJAX received");
    getMatchHistory(req.user._json.steamid);
    res.send(req.user);
});

function getMatchHistory(userID) {
    console.log(userID);
    console.log(userID - 76561197960265728);
    userID = userID - 76561197960265728;
    var url = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=" + process.env.DOTA_2_KEY// + "&account_id=" + userID;
    request(url, function(error, response, body) {
        if (error) console.log(error + "this is an error");
        console.log(body);
        console.log("request1");
    });
    url += "&account_id=" + userID;
    request(url, function(error, response, body) {
        if (error) console.log(error + "this is an error");
        console.log(body);
        console.log("request2");
    });
}

module.exports = router;