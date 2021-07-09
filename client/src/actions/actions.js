import axios from "axios";
export const GET_INITIAL_COUNTRIES = "GET_INITIAL_COUNTRIES";
export const GET_SEARCHED_COUNTRIES = "GET_SEARCHED_COUNTRIES";
export const FILTERED_COUNTRIES = "FILTERED_COUNTRIES";
export const POST_ACTIVITY = "POST_ACTIVITY";
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

export function filteredCountries(continent, orderBy, order, page) {
  return function (dispatch) {
    axios
      .get(
        `http://localhost:3001/countries?continent=${continent}&orderBy=${orderBy}&order=${order}&page=${page}`
      )
      .then((countries) => {
        dispatch({ type: FILTERED_COUNTRIES, payload: countries.data });
      })
      .catch((error) => console.error(error));
  };
}

export function postActivity(obj) {
  return function (dispatch) {
    axios
      .post("http://localhost:3001/activity", obj)
      .then((activity) => {
        dispatch({ type: POST_ACTIVITY, payload: activity.data });
      })
      .catch((error) => console.error(error));
  };
}
