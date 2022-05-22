const error = (message) => {
  return {
    type: "error",
    message,
  };
};

const success = (message, { results = null }) => {
  return {
    type: "success",
    message,
    payload: results,
  };
};

module.exports = { error, success };
