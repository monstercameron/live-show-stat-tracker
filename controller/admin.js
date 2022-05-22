// Handle Auth
const login = (req, res) => {
  return "login";
};
const logout = (req, res) => {
  return "logout";
};

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
