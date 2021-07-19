import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getActivities, getInitialCountries } from "../actions/actions";
import { CountryCointainer } from "./CountryCointainer";
import styles from "./Display.module.css";
export function Countries(props) {
  useEffect(() => {
    props.getInitialCountries();
  }, []);

  // INITIAL COUNTRIES
  if (
    props.searchedCountries.length === 0 &&
    props.filteredCountries.length === 0 &&
    props.filteredActivities.length === 0
  ) {
    return (
      <div className={styles.flex}>
        {props.initialCountries.map((x) => {
          return (
            <CountryCointainer
              key={x.name}
              name={x.name}
              continent={x.continent}
              flag={x.flag}
              ID={x.ID}
            ></CountryCointainer>
          );
        })}
      </div>
    );

    // SEARCHED COUNTRIES
  } else if (props.filteredCountries.length === 0) {
    return (
      <div className={styles.flex}>
        {props.searchedCountries.map((x) => {
          return (
            <CountryCointainer
              key={x.name}
              name={x.name}
              continent={x.continent}
              flag={x.flag}
              ID={x.ID}
            ></CountryCointainer>
          );
        })}
      </div>
    );
  } else {
    // FILTERED COUNTRIES
    return (
      <div className={styles.flex}>
        {props.filteredCountries.rows.map((x) => {
          return (
            <CountryCointainer
              key={x.name}
              name={x.name}
              continent={x.continent}
              flag={x.flag}
              ID={x.ID}
            ></CountryCointainer>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialCountries: state.initialCountries,
    searchedCountries: state.searchedCountries,
    filteredCountries: state.filteredCountries,
    filteredActivities: state.filteredActivities,
  };
}

export default connect(mapStateToProps, {
  getInitialCountries,
  getActivities,
})(Countries);
