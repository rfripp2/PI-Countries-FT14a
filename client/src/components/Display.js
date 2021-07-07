import React, { useEffect } from "react";
/* import { NavLink } from "react-router-dom"; */
import { connect } from "react-redux";
import { getInitialCountries } from "../actions/actions";
import { CountryCointainer } from "./CountryCointainer";
import styles from "./Display.module.css";
export function Countries(props) {
  useEffect(() => {
    props.getInitialCountries();
  }, []);

  if (
    props.searchedCountries.length == 0 &&
    props.filteredCountries.length == 0
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
            ></CountryCointainer>
          );
        })}
      </div>
    );
  } else if (props.filteredCountries.length == 0) {
    return (
      <div className={styles.flex}>
        {props.searchedCountries.map((x) => {
          return (
            <CountryCointainer
              key={x.name}
              name={x.name}
              continent={x.continent}
              flag={x.flag}
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
  };
}

export default connect(mapStateToProps, {
  getInitialCountries,
})(Countries);
