const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
// const cors = require("cors");
// const path = require("path");

//Local imports
const { controller } = require("./controller/index");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", controller);
//app.use('/media', express.static(path.join(__dirname, '/views/build')))

// test rpute
app.get("/", (req, res) => {
  res.send("test");
});

module.exports = { app };
