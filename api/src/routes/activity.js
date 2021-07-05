const { Router } = require("express");
const { Country, Activity } = require("../db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const router = Router();

router.post("/", async (req, res) => {
  const { name, dificulty, duration, season, country } = req.body;
  const countryFound = await Country.findOne({
    where: {
      name: country,
    },
  });
  const activityCreated = await Activity.create({
    name,
    dificulty,
    duration,
    season,
  });
  await countryFound.addActivity(activityCreated);
  await activityCreated.setCountries(countryFound);
  return res.sendStatus(200);
});

module.exports = router;
