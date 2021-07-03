const { Router } = require("express");
const { Country } = require("../db");
const axios = require("axios").default;
/* const addCountries = require("../controllers/countries"); */
const router = Router();
router.get("/", async (req, res) => {
  let countryList;
  return axios
    .get("https://restcountries.eu/rest/v2/all")
    .then((response) => {
      countryList = response.data.map((x) => {
        return {
          ID: x.alpha3Code,
          name: x.name,
          continent: x.region,
          capital: x.capital,
          subregion: x.subregion,
          area: x.area,
          population: x.population,
          flag: x.flag,
        };
      });
      return countryList;
    })
    .then((countryList) => {
      Country.bulkCreate(countryList);
      return Country.findAll({
        attributes: ["flag", "name", "continent"],
        limit: 10,
      });
    })
    .then((result) => res.json(result));
});

module.exports = router;
