const Person = require("../models/person");
const Episode = require("../models/episode");

const test = async (req, res) => {
  try {
    const episode = new Episode({ title: "kill to party 2" });
    const result = await episode.save();
    res.send(`Title:'${episode.title}', ID:'${result._id}'`);
  } catch (error) {
    res.send(error);
  }
};

const test2 = async (req, res) => {
    try {
      const person = new Person({ name: "john dowe" });
      const result = await person.save();
      res.send(`Title:'${person.name}', ID:'${result._id}'`);
    } catch (error) {
      res.send(error);
    }
  };

module.exports = {
  test,test2
};
