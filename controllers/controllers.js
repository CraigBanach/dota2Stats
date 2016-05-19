"use strict";

var express = require("express");
var router = express.Router();

router.use("/", require("./steamlogon"));
router.use("/matchHistory", require("./matchHistory"));

module.exports = router;