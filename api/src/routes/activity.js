const { Router } = require("express");
const { Country, Activity } = require("../db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const router = Router();

router.post("/", async (req, res) => {
  const { name, dificulty, duration, season } = req.body;
  Activity.create({
    name,
    dificulty,
    duration,
    season,
  });
  return res.sendStatus(200);
});

module.exports = router;
