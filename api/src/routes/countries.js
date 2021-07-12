const { Router } = require("express");
const { Country, Activity } = require("../db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const router = Router();

router.get("/", (req, res) => {
  const { name } = req.query;

  const { continent, activity, orderBy, order, page } = req.query;
  if (continent && orderBy && order && page) {
    return Country.findAll({
      attributes: ["flag", "name", "continent"],
      where: {
        continent: continent,
      },
      order: [[orderBy, order]],
      limit: 10,
      offset: page * 10,
    }).then((countries) => res.json(countries));
  }

  if (activity) {
    return Country.findAll({
      include: [
        {
          model: Activity,
          where: {
            name: activity,
          },
        },
      ],
    }).then((countries) => res.json(countries));
  }

  // If no name as query
  if (!name) {
    return Country.findAll({
      attributes: ["flag", "name", "continent", "ID"],
      limit: 10,
    }).then((countries) => {
      return res.json(countries);
    });
  }

  if (!continent) {
    return Country.findAll({
      attributes: ["flag", "name", "continent"],
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    }).then((countries) => {
      return countries.length > 0
        ? res.json(countries)
        : res.send("No Countries found");
    });
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
  }).then((country) => {
    return country ? res.json(country) : res.sendStatus(404);
  });
});

module.exports = router;
