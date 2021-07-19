import React, { useEffect } from "react";
import { getCountryDetail } from "../actions/actions";
import { connect } from "react-redux";
import { ActivityContainer } from "./ActivityContainer";
import styles from "./CountryDetails.module.css";
export function CountryDetails(props) {
  useEffect(() => {
    props.getCountryDetail(props.match.params.id);
  }, []);

  const {
    name,
    flag,
    continent,
    capital,
    subregion,
    area,
    population,
    activities,
  } = props.countryDetail;

  return (
    <div>
      <h2 className={styles.texts}>{name}</h2>
      <h3>{continent}</h3>
      <img alt={`${name} flag`} src={flag}></img>
      <h3>Capital: {capital}</h3>
      <h3>Subregion: {subregion}</h3>
      <h3>Area: {area}</h3>
      <h3>Population: {population}</h3>
      <div className={styles.flex}>
        {activities ? (
          activities.map((x) => {
            return (
              <ActivityContainer
                key={x.name}
                name={x.name}
                dificulty={x.dificulty}
                duration={x.duration}
                season={x.season}
              ></ActivityContainer>
            );
          })
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
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
