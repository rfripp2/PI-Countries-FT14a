const { Router } = require("express");
const { Country, Activity } = require("../db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const router = Router();

router.get("/", (req, res) => {
  const { name } = req.query;

  // If no name as query
  if (!name) {
    return Country.findAll({
      attributes: ["flag", "name", "continent"],
      limit: 10,
    }).then((countries) => {
      return res.json(countries);
    });
  }

  return Country.findAll({
    attributes: ["flag", "name", "continent"],
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  }).then((countries) => {
    return countries.length > 1
      ? res.json(countries)
      : res.send("No Countries found");
  });
});

router.post("/", (req, res) => {
  const { continents, activities, orderBy, order, page } = req.body;

  Country.findAll({
    attributes: ["flag", "name", "continent"],
    where: {
      continent: continents,
    },
    order: [[orderBy, order]],
    limit: 10,
    offset: page * 10,
  }).then((countries) => res.json(countries));
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
