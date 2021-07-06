import { GET_COUNTRIES } from "../actions/actions";

const initialState = {
  initialCountries: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        initialCountries: action.payload,
      };
    default:
      return state;
  }
}
export default rootReducer;
