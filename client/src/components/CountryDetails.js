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
    ID,
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
      <img className={styles.img} alt={`${name} flag`} src={flag}></img>
      <h2 className={styles.name}>{name}</h2>
      <h3 className={styles.secondary}>{continent}</h3>

      <h3 className={styles.secondary}>Capital: {capital}</h3>
      <h3 className={styles.secondary}>Subregion: {subregion}</h3>
      <h3 className={styles.secondary}>Area: {area} km2</h3>
      <h3 className={styles.secondary}>Population: {population}</h3>
      <h3 className={styles.secondary}>Code: {ID}</h3>
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
