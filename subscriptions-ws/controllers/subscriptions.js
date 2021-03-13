const express = require("express");
const router = express.Router();
const subscriptionBL = require("../models/BLs/subscription");

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

router.get("/movies/:movieId", (req, res) => {
  subscriptionBL
    .getMembersByMovieId(req.params.movieId)
    .then((data) => res.json(data))
    .catch((err) => res.json({ err }));
});

router.get("/members/:memberId", (req, res) => {
  subscriptionBL
    .getByMemberId(req.params.memberId)
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
    .then((data) => data ? res.json(data) : res.json({err: "Error"}))
    .catch((err) => res.json({ err }));
});

router.delete("/:id", (req, res) => {
  subscriptionBL
    .deleteById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json({ err }));
});

router.delete("/movies/:movieId", (req, res) => {
  subscriptionBL
    .deleteByMovieId(req.params.movieId)
    .then((data) => data ? res.json(data) : res.json({err: "Error"}))
    .catch((err) => res.json({ err }));
});

router.delete("/members/:memberId", (req, res) => {
  subscriptionBL
    .deleteByMemberId(req.params.memberId)
    .then((data) => res.json(data))
    .catch((err) => res.json({ err }));
});

module.exports = router;
