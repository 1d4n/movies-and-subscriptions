const express = require("express");
const router = express.Router();
const movieBL = require("../models/BLs/movie");

router.get("/", (req, res) => {
	movieBL
		.getAll()
		.then(data => res.json(data))
		.catch(err => res.json({ err }));
});

router.get("/:id", (req, res) => {
	movieBL
		.getById(req.params.id)
		.then(data => res.json(data))
		.catch(err => res.json({ err }));
});

router.post("/", (req, res) => {
	movieBL
		.addNew(req.body)
		.then(data => res.json(data))
		.catch(err => res.json({ err }));
});

router.patch("/:id", (req, res) => {
	movieBL
		.updateById(req.params.id, req.body)
		.then(data => res.json(data))
		.catch(err => res.json({ err }));
});

router.delete("/:id", (req, res) => {
	movieBL
		.deleteById(req.params.id)
		.then(data => res.json(data))
		.catch(err => res.json({ err }));
});

module.exports = router;
