import React, { useEffect, useState, Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getCountries } from "../actions/actions";
import { CountryCointainer } from "./CountryCointainer";
export function Countries(props) {
  useEffect(() => {
    props.getCountries();
  }, []);

  return (
    <div>
      <h2>Countries</h2>
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
}

function mapStateToProps(state) {
  return {
    initialCountries: state.initialCountries,
  };
}

export default connect(mapStateToProps, { getCountries })(Countries);
