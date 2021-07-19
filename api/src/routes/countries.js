const { Router } = require("express");
const { Country, Activity } = require("../db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const router = Router();

router.get("/", (req, res) => {
  const { name } = req.query;
  const { continent, activity, orderBy, order, page, offset } = req.query;

  // Get list of filter by continent
  if (continent && orderBy && order && page && offset) {
    return Country.findAndCountAll({
      attributes: ["flag", "name", "continent", "ID"],
      where: {
        continent: continent,
      },
      order: [[orderBy, order]],
      limit: 10,
      offset: offset,
    })
      .then((countries) => res.json(countries))
      .catch((error) => res.status(500).json({ message: error.message }));
  }
  //Get list of filter by activity
  if (activity) {
    return Country.findAndCountAll({
      include: [
        {
          model: Activity,
          where: {
            name: activity,
          },
        },
      ],
    })
      .then((countries) => res.json(countries))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // If no name as query ,return the initial countries
  if (!name && !continent && !activity) {
    return Country.findAll({
      attributes: ["flag", "name", "continent", "ID"],
      limit: 10,
    })
      .then((countries) => {
        return res.json(countries);
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Else, return the searched countries
  if (!continent) {
    return Country.findAll({
      attributes: ["flag", "name", "continent", "ID"],
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    })
      .then((countries) => {
        if (countries.length > 0) return res.json(countries);
        return res.status(404).json({ message: "No country found" });
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Country.findOne({
    attributes: [
      "ID",
      "name",
      "continent",
      "capital",
      "subregion",
      "area",
      "population",
      "flag",
    ],
    include: Activity,
    where: {
      ID: id.toUpperCase(),
    },
  })
    .then((country) => {
      return country ? res.json(country) : res.sendStatus(404);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
