const express = require("express");
const router = express.Router();
const allUserDataBL = require("../models/BLs/allUserDataBL");
const userBL = require("../models/BLs/user");

router.get("/", (req, res) => {
	allUserDataBL
		.getAll()
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

router.get("/:id", (req, res) => {
	allUserDataBL
		.getById(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

router.patch("/:id", (req, res) => {
	allUserDataBL
		.updateById(req.params.id, req.body)
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

router.post("/", (req, res) => {
	allUserDataBL
		.addNew(req.body)
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

router.delete("/:id", (req, res) => {
	allUserDataBL
		.deleteById(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

router.post("/login/:username", (req, res) => {
	const pwd = req.body?.password ?? "";
	userBL
		.login(req.params.username, pwd)
		.then((data) => res.json({ userId: data }))
		.catch((err) => res.json({ err }));
});

router.post("/signin", async (req, res) => {
	try {
		if (!req.body.username || !req.body.password) return res.status(400).json({ message: "Invalid Data!" });

		const resp = await userBL.signin(req.body.username, req.body.password);
		res.status(200).json(resp);
	} catch (err) {
		if (err === "not exists") return res.status(403).json({ message: "Invalid username!" });
		if (err === "not registered") return res.status(403).json({ message: "You have to register first!" });
		if (err === "wrong password") return res.status(403).json({ message: "Invalid password!" });
		res.status(500).json({ message: err });
	}
});

router.post("/signup", async (req, res) => {
	try {
		if (!req.body.username || !req.body.password) return res.status(400).json({ message: "Invalid Data!" });

		const resp = await userBL.signup(req.body.username, req.body.password);
		res.status(200).json({ message: resp });
	} catch (err) {
		if (err === "Invalid username!") return res.status(403).json({ message: "You were not invited by the Admin!" });
		if (err === "Already registered!") return res.status(403).json({ message: "You're already registered!" });
		res.status(500).json({ message: err });
	}
});

module.exports = router;
