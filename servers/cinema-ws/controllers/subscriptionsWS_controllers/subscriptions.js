const subscriptionBL = require("../../models/BLs/subscriptionsWS_BLs/subscription");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	subscriptionBL
		.getAll()
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

router.get("/:id", (req, res) => {
	subscriptionBL
		.getById(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

router.get("/members/:id", (req, res) => {
	subscriptionBL
		.getByMemberId(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

router.get("/movies/:id", (req, res) => {
	subscriptionBL
		.getByMovieId(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

router.post("/", (req, res) => {
	subscriptionBL
		.addNew(req.body)
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

router.patch("/:id", (req, res) => {
	subscriptionBL
		.updateById(req.params.id, req.body)
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

router.delete("/:id", (req, res) => {
	subscriptionBL
		.deleteById(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

router.delete("/members/:id", (req, res) => {
	subscriptionBL
		.deleteByMemberId(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

router.delete("/movies/:id", (req, res) => {
	subscriptionBL
		.deleteByMovieId(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => res.json({ err }));
});

module.exports = router;
