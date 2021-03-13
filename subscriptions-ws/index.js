const express = require("express");
const cors = require("cors");
const dbConfigs = require("./configs/db");
const dbSetup = require("./setup");

const membersController = require("./controllers/members");
const moviesController = require("./controllers/movies");
const subscriptionsController = require("./controllers/subscriptions");

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/members", membersController);
app.use("/api/movies", moviesController);
app.use("/api/subscriptions", subscriptionsController);

dbConfigs
  .connect()
  .then(() => {
    console.dir("Connected to the subscriptionsDB!");
    app.listen(port, () => {
      console.dir("Server is up!");
      dbSetup.setup().then(console.log).catch(console.error);
    });
  })
  .catch(console.error);
