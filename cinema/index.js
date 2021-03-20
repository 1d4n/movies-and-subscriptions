const express = require("express");
const cors = require("cors");
const dbConfigs = require("./configs/db");

const usersController = require("./controllers/users");
const moviesController = require("./controllers/subscriptionsWS_controllers/movies");
const membersController = require("./controllers/subscriptionsWS_controllers/members");
const subscriptionsController = require("./controllers/subscriptionsWS_controllers/subscriptions");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", usersController);
app.use("/movies", moviesController);
app.use("/members", membersController);
app.use("/subscriptions", subscriptionsController);

dbConfigs
	.connect()
	.then((msg) => {
		console.log(msg);
		app.listen(PORT, () => {
			console.log("Server is up!");
		}).on("error", (err) => console.error(err));
	})
	.catch((err) => console.error(err));
