const Person = require('../models/person')

const vote = (req, res) => {
  res.send('vote');
};

module.exports = {
  vote,
};
