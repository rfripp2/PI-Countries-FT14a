import {
  GET_INITIAL_COUNTRIES,
  GET_SEARCHED_COUNTRIES,
  FILTERED_COUNTRIES,
  POST_ACTIVITY,
  FILTERED_ACTIVITIES,
} from "../actions/actions";

const initialState = {
  initialCountries: [],
  searchedCountries: [],
  filteredCountries: [],
  activities: [],
  filteredActivities: [],
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
    case POST_ACTIVITY:
      return {
        ...state,
        activities: state.activities.concat(action.payload),
      };
    case FILTERED_ACTIVITIES:
      return {
        ...state,
        filteredActivities: action.payload,
      };
    default:
      return state;
  }
}
export default rootReducer;
