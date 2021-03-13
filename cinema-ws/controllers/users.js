const express = require("express");
const router = express.Router();
const allUserDataBL = require("../models/BLs/allUserDataBL");

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

module.exports = router;
