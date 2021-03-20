const memberBL = require("../../models/BLs/subscriptionsWS_BLs/member");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	memberBL
		.getAll()
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

router.get("/:id", (req, res) => {
	memberBL
		.getById(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

router.post("/", (req, res) => {
	memberBL
		.addNew(req.body)
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

router.patch("/:id", (req, res) => {
	memberBL
		.updateById(req.params.id, req.body)
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

router.delete("/:id", (req, res) => {
	memberBL
		.deleteById(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

module.exports = router;
