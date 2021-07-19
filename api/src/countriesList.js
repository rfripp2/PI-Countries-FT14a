const axios = require("axios").default;
function createCountries(model) {
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
      return model.bulkCreate(countryList);
    });
}

module.exports = { createCountries };
