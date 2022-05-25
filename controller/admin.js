const {
  hash,
  hashMatch,
  createToken,
  validateToken,
} = require("../tools/authentication");
const {
  loginBodyValidation,
  createVoteValidation,
  createLoginValidation,
  createEpisodeValidation,
} = require("../tools/validation");
const { ObjectId } = require("mongodb");
const { User } = require("../models/user");
const { Vote } = require("../models/vote");
const { Person } = require("../models/person");
const { Episode } = require("../models/episode");
const { ValidationError } = require("../tools/error");
const { error, success } = require("../tools/response");

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
  try {
    // validate params
    createEpisodeValidation(req.body);

    // check if episode exists
    const previousEpisode = await Episode.findOne({
      episode: req.body.episode,
    });
    if (previousEpisode === null)
      throw new ValidationError("Episode not found");

    // edit episode
    const editedEpisode = await Episode.findOneAndUpdate(
      { episode: req.body.episode },
      req.body,
      { new: true }
    );

    // send response
    res.status(200).send(success(`Episode edited`, { results: editedEpisode }));
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

// delete episode
const deleteEpisode = async (req, res) => {
  try {
    // check if episode exists
    const previousEpisode = await Episode.findOne({
      episode: req.query.episode,
    });
    if (previousEpisode === null)
      throw new ValidationError("Episode not found");

    // delete episode
    await Episode.findOneAndDelete({ episode: req.query.episode });

    // send response
    res.status(200).send(success(`Episode deleted`, {}));
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

// Get all person
const getPerson = async (req, res) => {
  try {
    if (req.query.id) {
      const person = await Person.findOne({ _id: req.query.id });
      if (person === null) throw new ValidationError("Person not found");
      res.status(200).send(success(`Person found`, { results: person }));
    } else {
      const results = await Person.find({});
      res.status(200).send(success(`Persons found`, { results }));
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

// edit person TODO
const addPerson = async (req, res) => {
  try {
    if (req.query.id) {
      const person = await Person.findOne({ _id: req.query.id });
      if (person === null) throw new ValidationError("Person not found");
      // await Person.findOneAndDelete({ _id: req.query.id });
      res
        .status(200)
        .send(
          success(
            `-Not implemented- Person removed by ID:'${req.query.id}'`,
            {}
          )
        );
    } else {
      throw new ValidationError("Please provide a person id");
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

// edit person TODO
const editPerson = async (req, res) => {
  try {
    if (req.query.id) {
      const person = await Person.findOne({ _id: req.query.id });
      if (person === null) throw new ValidationError("Person not found");
      // await Person.findOneAndDelete({ _id: req.query.id });
      res
        .status(200)
        .send(
          success(
            `-Not implemented- Person removed by ID:'${req.query.id}'`,
            {}
          )
        );
    } else {
      throw new ValidationError("Please provide a person id");
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

// delete person
const deletePerson = async (req, res) => {
  try {
    if (req.query.id) {
      const person = await Person.findOne({ _id: req.query.id });
      if (person === null) throw new ValidationError("Person not found");
      await Person.findOneAndDelete({ _id: req.query.id });
      res
        .status(200)
        .send(success(`Person removed by ID:'${req.query.id}'`, {}));
    } else {
      throw new ValidationError("Please provide a person id");
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

// Get votes
const getVote = async (req, res) => {
  try {
    if (req.query.id) {
      const vote = await Vote.find({ targetId: req.query.id });
      if (vote.length === 0)
        throw new ValidationError(`votes not found for ID:'${req.query.id}'`);
      res.status(200).send(success(`vote(s) found`, { results: vote }));
    } else {
      throw new ValidationError("Please provide a target id for votes");
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

// add vote or overwrite vote
const addVote = async (req, res) => {
  try {
    // validate vote params
    createVoteValidation(req.body);

    // check if person exists
    const previousPerson = await Person.findOne({ _id: req.body.targetId });
    if (previousPerson === null) throw new ValidationError("Person not found");

    const identifier = `${req.ip + req.get("User-Agent")}`;
    const identifierHash = await hash(identifier);

    // check if vote exists
    const previousVote = await Vote.findOne({
      identifierHash,
      targetId: req.body.targetId,
    });
    if (previousVote === null) {
      // create new vote
      const newVote = new Vote({ indentifier: identifierHash, ...req.body });
      await newVote.save();
      res.send(success(`Vote added for Identifier:'${identifierHash}'`, {}));
    } else {
      // overwrite vote
      console.log("overwrite vote");
      await Vote.findOneAndUpdate({ identifierHash }, req.body, { new: true });
      res.send(
        success(
          `Vote overwritten for target:'${req.body.targetId}' by Identifier:'${identifierHash}'`,
          {}
        )
      );
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

// delete vote
const deleteVote = async (req, res) => {
  try {
    if (req.query.id) {
      const vote = await Vote.findOne({ _id: req.query.id });
      if (vote === null) throw new ValidationError("Vote not found");
      await Vote.findOneAndDelete({ _id: req.query.id });
      res.status(200).send(success(`Vote removed by ID:'${req.query.id}'`, {}));
    } else {
      throw new ValidationError("Please provide a vote id");
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
  editPerson,
  deletePerson,
  getVote,
  addVote,
  deleteVote,
};
