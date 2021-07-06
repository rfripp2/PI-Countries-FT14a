import React, { useEffect, useState, Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getCountries } from "../actions/actions";
export function Countries(props) {
  useEffect(() => {
    props.getCountries();
  });

  return <h2>Countries</h2>;
}

function mapStateToProps(state) {
  return {
    initialCountries: state.initialCountries,
  };
}

export default connect(mapStateToProps, { getCountries })(Countries);
