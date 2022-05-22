const router = require("express").Router();

//Local imports
const Vote = require("./vote.js");
const Stats = require("./stats.js");
const Admin = require("./admin.js");
const Test = require("./test.js");

// Handle Admin Tasks
// handle token generation
router.post("/admin/login", Admin.login);
// handle Episodes
router.get("/admin", Admin.getEpisode);
router.post("/admin", Admin.addEpisode);
router.put("/admin", Admin.editEpisode);
router.delete("/admin", Admin.deleteEpisode);
// handle Persons
router.get("/admin", Admin.getPerson);
router.post("/admin", Admin.addPerson);
router.put("/admin", Admin.editPerson);
router.delete("/admin", Admin.deletePerson);
// handle Votes
router.get("/admin", Admin.getVote);
router.post("/admin", Admin.addVote);
router.put("/admin", Admin.editVote);
router.delete("/admin", Admin.deleteVote);

// Handle non auth voting
router.get("/vote", Vote.vote);

// handle stats
router.get("/stats", Admin.login);

// test functions
router.get("/test", Test.test);
router.get("/test2", Test.test2);

module.exports = { controller: router };
