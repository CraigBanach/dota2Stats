var express = require("express");
var router = express.Router();
var request = require("request");

router.get("/mystats", function(req, res) {
    res.render("mystats.ejs", { user: req.user });
});

module.exports = router;