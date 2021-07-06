import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";

export function getCountries() {
  return function (dispatch) {
    return axios.get("http://localhost:3001/countries/").then((countries) => {
      dispatch({ type: GET_COUNTRIES, payload: countries });
    });
  };
}
