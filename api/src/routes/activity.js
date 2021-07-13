const { Router } = require("express");
const { Country, Activity } = require("../db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const router = Router();

router.post("/", async (req, res) => {
  const { name, dificulty, duration, season, country } = req.body;
  /* const countryFound = await Country.findOne({
    where: {
      name: {
        [Op.iLike]: country,
      },
    },
  }); */
  const activityCreated = await Activity.create({
    name,
    dificulty,
    duration,
    season,
  });

  country.map(async (x) => {
    let countryFound = await Country.findOne({
      where: {
        name: {
          [Op.iLike]: x,
        },
      },
    });
    if (countryFound) {
      await activityCreated.setCountries(countryFound);
      await countryFound.addActivity(activityCreated);
    }
  });

  return res.json(activityCreated);
});

// GET Activities list for maping options on the front
router.get("/", (req, res) => {
  Activity.findAll().then((activities) => res.json(activities));
});

module.exports = router;
