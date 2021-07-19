const { Router } = require("express");
const { Country, Activity } = require("../db");
const Sequelize = require("sequelize");
const e = require("express");
const Op = Sequelize.Op;
const router = Router();

router.post("/", async (req, res) => {
  const succes = true;

  const { name, dificulty, duration, season, country } = req.body;

  const activityCreated = await Activity.create({
    name,
    dificulty,
    duration,
    season,
  });
  try {
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
        return res.status(201).json(activityCreated);
      } else {
        res.json({
          message:
            "Activity was created but likely countries werent added correctly",
        });
      }
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

// GET Activities list for maping options on the front
router.get("/", (req, res) => {
  Activity.findAll()
    .then((activities) => res.json(activities))
    .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
