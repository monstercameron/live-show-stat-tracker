const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// bcrypt compare password
const hashMatch = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// bcrypted hash password
const hash = async (password) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

// validate JWT token
const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (e) {
    throw e;
    //throw new ValidationError("Invalid token");
  }
};

// create JWT token
const createToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
};


module.exports = {
  hash,
  hashMatch,
  createToken,
  validateToken,
};
