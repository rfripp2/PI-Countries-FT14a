import React, { useEffect } from "react";
import { getCountryDetail } from "../actions/actions";
import { connect } from "react-redux";
import { ActivityContainer } from "./ActivityContainer";
export function CountryDetails(props) {
  useEffect(() => {
    props.getCountryDetail(props.match.params.id);
  }, []);

  const {
    name,
    flag,
    ID,
    continent,
    capital,
    subregion,
    area,
    population,
    activities,
  } = props.countryDetail;

  return (
    <div>
      <h2>{name}</h2>
      <h3>{continent}</h3>
      <img src={flag}></img>
      <h3>{capital}</h3>
      <h3>Subregion: {subregion}</h3>
      <h3>Area: {area}</h3>
      <h3>Population: {population}</h3>
      <h3>Activities</h3>
      {/*  {activities.map((x) => {
        return (
          <div>
            <ActivityContainer
              name={x.name}
              dificulty={x.dificulty}
              duration={x.duration}
              season={x.season}
            ></ActivityContainer>
          </div>
        );
      })} */}
      {activities ? (
        activities.map((x) => {
          return (
            <div>
              <ActivityContainer
                name={x.name}
                dificulty={x.dificulty}
                duration={x.duration}
                season={x.season}
              ></ActivityContainer>
            </div>
          );
        })
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    countryDetail: state.countryDetail,
    activities: state.activities,
  };
}
export default connect(mapStateToProps, { getCountryDetail })(CountryDetails);
