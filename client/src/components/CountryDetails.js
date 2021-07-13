import React, { useEffect } from "react";
import { getCountryDetail } from "../actions/actions";
import { connect } from "react-redux";
export function CountryDetails(props) {
  useEffect(() => {
    props.getCountryDetail(props.match.params.id);
  }, []);

  return (
    <div>
      <h3>{props.countryDetail.name}</h3>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    countryDetail: state.countryDetail,
  };
}
export default connect(mapStateToProps, { getCountryDetail })(CountryDetails);
