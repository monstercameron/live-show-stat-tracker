const router = require("express").Router();

//Local imports
const Vote = require("./vote.js");
const Stats = require("./stats.js");
const Admin = require("./admin.js");

router.get("/vote", Vote.vote);
router.get("/admin", Stats.stats);
router.get("/stats", Admin.login);

module.exports = { controller: router };
