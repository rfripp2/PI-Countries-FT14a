import axios from "axios";
export const GET_INITIAL_COUNTRIES = "GET_INITIAL_COUNTRIES";
export const GET_SEARCHED_COUNTRIES = "GET_SEARCHED_COUNTRIES";
export function getInitialCountries() {
  return function (dispatch) {
    axios.get("http://localhost:3001/countries/").then((countries) => {
      dispatch({ type: GET_INITIAL_COUNTRIES, payload: countries.data });
    });
  };
}

export function getSearchedCountries(country) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/countries?name=${country}`)
      .then((countries) => {
        dispatch({ type: GET_SEARCHED_COUNTRIES, payload: countries.data });
      });
  };
}
