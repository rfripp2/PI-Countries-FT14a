import axios from "axios";
export const GET_INITIAL_COUNTRIES = "GET_INITIAL_COUNTRIES";
export const GET_SEARCHED_COUNTRIES = "GET_SEARCHED_COUNTRIES";
export const FILTERED_COUNTRIES = "FILTERED_COUNTRIES";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
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

export function filteredCountries(continent, orderBy, order, page, offset) {
  return function (dispatch) {
    axios
      .get(
        `http://localhost:3001/countries?continent=${continent}&orderBy=${orderBy}&order=${order}&page=${page}&offset=${offset}`
      )
      .then((countries) => {
        dispatch({ type: FILTERED_COUNTRIES, payload: countries.data });
      })
      .catch((error) => console.error(error));
  };
}

export function filteredActivities(activity, orderBy, order, page, offset) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/countries?activity=${activity}`)
      .then((countries) => {
        return countries.data;
      })
      .then((countries) => {
        countries.rows = countries.rows.sort((a, b) => {
          if (a[orderBy] < b[orderBy]) {
            return order === "DESC" ? -1 : 1;
          }
          if (a[orderBy] > b[orderBy]) {
            return order === "DESC" ? 1 : -1;
          }
          return 0;
        });
        return countries;
      })
      .then((result) => {
        dispatch({ type: FILTERED_COUNTRIES, payload: result });
      });
  };
}

export function postActivity(obj) {
  obj.country = obj.country.split(",");
  return function (dispatch) {
    axios
      .post("http://localhost:3001/activity", obj)
      .then((activity) => {
        dispatch({ type: POST_ACTIVITY, payload: activity.data });
      })
      .catch((error) => console.error(error));
  };
}

export function getActivities() {
  return function (dispatch) {
    axios.get("http://localhost:3001/activity").then((activities) => {
      dispatch({ type: GET_ACTIVITIES, payload: activities.data });
    });
  };
}

export function getCountryDetail(id) {
  return function (dispatch) {
    axios.get(`http://localhost:3001/countries/${id}`).then((detail) => {
      dispatch({ type: GET_COUNTRY_DETAIL, payload: detail.data });
    });
  };
}
