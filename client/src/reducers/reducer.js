import {
  GET_INITIAL_COUNTRIES,
  GET_SEARCHED_COUNTRIES,
  FILTERED_COUNTRIES,
  GET_ACTIVITIES,
  GET_COUNTRY_DETAIL,
} from "../actions/actions";

const initialState = {
  initialCountries: [],
  searchedCountries: [],
  filteredCountries: [],
  activities: [],
  filteredActivities: [],
  countryDetail: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INITIAL_COUNTRIES:
      return {
        ...state,
        initialCountries: action.payload,
      };
    case GET_SEARCHED_COUNTRIES:
      return {
        ...state,
        searchedCountries: state.searchedCountries.concat(action.payload),
      };
    case FILTERED_COUNTRIES:
      return {
        ...state,
        filteredCountries: action.payload,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: action.payload,
      };

    default:
      return state;
  }
}
export default rootReducer;
