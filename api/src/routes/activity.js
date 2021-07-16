const { Router } = require("express");
const { Country, Activity } = require("../db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const router = Router();

router.post("/", async (req, res) => {
  const succes = true;
  try {
    const { name, dificulty, duration, season, country } = req.body;

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
        return res.send("Activity created succesfully");
      } else {
        return res.send("Error");
      }
    });
  } catch (error) {
    console.error(error);
  }
});

// GET Activities list for maping options on the front
router.get("/", (req, res) => {
  Activity.findAll()
    .then((activities) => res.json(activities))
    .catch((error) => console.error(error));
});

module.exports = router;
