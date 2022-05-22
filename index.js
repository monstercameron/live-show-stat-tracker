const { app } = require("./app.js");

//Local imports
const mongoose = require("./tools/database");

mongoose
  .connect("mongodb://localhost:27017/stats")
  .then((mongo) => {
    console.log(`Connected to Database`);
    app.listen(process.env.PORT, () => {
      console.log(`App Listening on Port:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });
