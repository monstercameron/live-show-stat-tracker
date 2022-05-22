class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class AutehnticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AutehnticationError";
  }
}

module.exports = { ValidationError, AutehnticationError };
