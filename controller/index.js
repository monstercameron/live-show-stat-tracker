const router = require("express").Router();

//Local imports
const Vote = require("./vote.js");
const Stats = require("./stats.js");
const Admin = require("./admin.js");
const Test = require("./test.js");
const { authenticate } = require("../middleware/authenticate");
const { logging } = require("../middleware/logging");

router.use(logging);

// Handle Admin Tasks
// handle token generation
router.post("/admin/login", Admin.login);
// handle token invalidation
router.post("/admin/logout", authenticate, Admin.logout);
// create new admin account
router.post("/admin/newadmin", authenticate, Admin.createAdmin);
// handl token refresh
router.post("/admin/refresh", authenticate, Admin.refreshToken);
// handle Episodes
router.get("/admin/episode", Admin.getEpisode);
router.post("/admin/episode", authenticate, Admin.addEpisode);
router.put("/admin/episode", authenticate, Admin.editEpisode);
router.delete("/admin/episode", authenticate, Admin.deleteEpisode);
// handle Persons
router.get("/admin/person", authenticate, Admin.getPerson);
router.put("/admin/person", authenticate, Admin.editPerson);
router.delete("/admin/person", authenticate, Admin.deletePerson);
// handle Votes
router.get("/vote", Admin.getVote);
router.post("/vote", Admin.addVote);
router.delete("/vote", authenticate, Admin.deleteVote);
// handle stats
router.get("/stats", Admin.login);

// test functions
router.get("/test", authenticate, Test.test);
router.get("/test2", Test.test2);

module.exports = { controller: router };
