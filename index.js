const { app } = require("./app.js");

//Local imports
const { db } = require("./tools/database");

db.once("open", (stream) => {
  console.log(`Connected to Database`);
  app.listen(process.env.PORT, () => {
    console.log(`App Listening on Port:${process.env.PORT}`);
  });
});

db.on("error", (err) => {
  console.log(`Error: ${err}`);
});
