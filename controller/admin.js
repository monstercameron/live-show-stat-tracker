const {
  hash,
  hashMatch,
  loginBodyValidation,
  createLoginValidation,
} = require("../tools/authentication");
const { ValidationError } = require("../tools/error");
const { error, success } = require("../tools/response");
const { User } = require("../models/user");

// Handle Auth
const login = async (req, res) => {
  try {
    // validate if params exists
    loginBodyValidation(req.body);
    // validate login params are in spec
    // query db is user exists by email
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    res.status(200).send(success(`Credentials accepted`, {}));
  } catch (e) {
    switch (e) {
      case e instanceof ValidationError:
        res.status(400).send(error(e.message));
        break;
      default:
        res.status(500).send(error(e.message));
        break;
    }
  }
};
const createAdmin = async (req, res) => {
  try {
    console.log(req.body);
    const result = createLoginValidation(req.body);
    console.log(result);
    res.status(200).send(success(`Admin '${'test name'}' created`, {}));
  } catch (e) {
    switch (e) {
      case e instanceof ValidationError:
        res.status(400).send(error(e.message));
        break;
      default:
        res.status(500).send(error(e.message));
        break;
    }
  }
};
const logout = (req, res) => {};

// Handle Episode
const getEpisode = async (req, res) => {
  res.send("addEpisode");
};
const addEpisode = async (req, res) => {
  res.send("addEpisode");
};
const editEpisode = async (req, res) => {
  res.send("addEpisode");
};
const deleteEpisode = async (req, res) => {
  res.send("addEpisode");
};

// Handle Person
const getPerson = async (req, res) => {
  res.send("addEpisode");
};
const addPerson = async (req, res) => {
  res.send("addEpisode");
};
const editPerson = async (req, res) => {
  res.send("addEpisode");
};
const deletePerson = async (req, res) => {
  res.send("addEpisode");
};

// Handle Vote
const getVote = async (req, res) => {
  res.send("addVote");
};
const addVote = async (req, res) => {
  res.send("addVote");
};
const editVote = async (req, res) => {
  res.send("addVote");
};
const deleteVote = async (req, res) => {
  res.send("addVote");
};

// Export functions
module.exports = {
  login,
  logout,
  createAdmin,
  getEpisode,
  addEpisode,
  editEpisode,
  deleteEpisode,
  getPerson,
  addPerson,
  editPerson,
  deletePerson,
  getVote,
  addVote,
  editVote,
  deleteVote,
};
