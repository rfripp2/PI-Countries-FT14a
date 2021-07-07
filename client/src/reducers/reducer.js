import {
  GET_INITIAL_COUNTRIES,
  GET_SEARCHED_COUNTRIES,
} from "../actions/actions";

const initialState = {
  initialCountries: [],
  searchedCountries: [],
  filteredCountries: [],
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
    default:
      return state;
  }
}
export default rootReducer;
