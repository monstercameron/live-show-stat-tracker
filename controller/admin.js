const {
  hash,
  hashMatch,
  createToken,
  validateToken,
} = require("../tools/authentication");
const {
  loginBodyValidation,
  createLoginValidation,
  createEpisodeValidation,
} = require("../tools/validation");
const { ValidationError } = require("../tools/error");
const { error, success } = require("../tools/response");
const { User } = require("../models/user");
const { Episode } = require("../models/episode");

// Handle token creation
const login = async (req, res) => {
  try {
    // validate if params exists
    loginBodyValidation(req.body);
    const { email, password } = req.body;

    // query db is user exists by email
    const user = await User.findOne({ email });
    if (user === null) throw new ValidationError("User not found");

    // check if password matches
    const match = await hashMatch(password, user.password);
    if (!match) throw new ValidationError("Password does not match");

    // create token
    const token = createToken(user);

    // send response
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .send(success(`Credentials accepted`, { results: token }));
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

// create admin account
const createAdmin = async (req, res) => {
  /*
    test credentials
    {
      "name":"test name",
      "email":"test@test.com",
      "password":"Testtest1",
      "recovery":"test",
      "recoveryQuestion":"test"
    }
  */
  try {
    // Validate params
    createLoginValidation(req.body);
    const { name, email, password, recovery, recoveryQuestion } = req.body;

    // check if user exists
    const previousUser = await User.findOne({ email });
    if (previousUser !== null) throw new ValidationError("User already exists");

    // hash password and recovery
    const passwordHash = await hash(password);
    const recoveryHash = await hash(recovery + recoveryQuestion);

    // create user
    const admin = new User({
      name,
      email,
      password: passwordHash,
      recovery: recoveryHash,
      recoveryQuestion,
      role: "admin",
    });

    // save user
    await admin.save();

    // send response
    res.status(200).send(success(`Admin '${admin._id}' created`, {}));
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

// handle token invalidation
const logout = (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) throw new ValidationError("No token found");
    res.status(200).clearCookie("access_token").send(success(`Logged out`, {}));
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

// handle refresh token
const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) throw new ValidationError("No token found");
    const decoded = validateToken(token);
    const user = await User.findById(decoded.id);
    if (!user) throw new ValidationError("User not found");
    const newToken = createToken(user);
    res
      .status(200)
      .cookie("access_token", newToken, {
        httpOnly: true,
      })
      .send(success(`Token refreshed`, { results: newToken }));
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

// Handle Episodes
// get episodes
const getEpisode = async (req, res) => {
  try {
    if (req.query.episode) {
      const episode = await Episode.findOne({ episode: req.query.episode });
      if (episode === null) throw new ValidationError("Episode not found");
      res.status(200).send(success(`Episode found`, { results: episode }));
    } else {
      const results = await Episode.find({});
      res.status(200).send(success(`Episodes found`, { results }));
    }
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

// create episode
const addEpisode = async (req, res) => {
  try {
    // validate params
    createEpisodeValidation(req.body);

    // check if episode exists
    const previousEpisode = await Episode.findOne({
      episode: req.body.episode,
    });
    if (previousEpisode !== null)
      throw new ValidationError("Episode already exists");

    // create episode
    const newEpisode = new Episode(req.body);
    await newEpisode.save();

    // send response
    res.status(200).send(success(`Episode created`, { results: newEpisode }));
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

// edit episode
const editEpisode = async (req, res) => {
  res.send("addEpisode");
};

// delete episode
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
  refreshToken,
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
