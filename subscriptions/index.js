const express = require("express");
const cors = require("cors");
const dbConfigs = require("./configs/db");
const dbSetup = require("./setup");

const membersController = require("./controllers/members");
const moviesController = require("./controllers/movies");
const subscriptionsController = require("./controllers/subscriptions");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/members", membersController);
app.use("/movies", moviesController);
app.use("/subscriptions", subscriptionsController);

dbConfigs
	.connect()
	.then(() => {
		console.log("Connected to the subscriptionsDB!");
		app.listen(PORT, () => {
			console.log("Server is up!");
        }).on("error", (err) => console.error(err));
        
	})
	.then(() => dbSetup.setup())
	.then((data) => console.log(data))
	.catch((err) => console.error(err));
