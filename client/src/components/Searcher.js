import React, { useState } from "react";
import { getSearchedCountries } from "../actions/actions";
import { connect } from "react-redux";
import styles from "./Searcher.module.css";
export function Searcher(props) {
  const [country, setCountry] = useState("");
  const handleOnChange = (e) => {
    setCountry(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setCountry("");
    props.getSearchedCountries(country);
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Search Countries</h2>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          name="country"
          value={country}
          onChange={(e) => handleOnChange(e)}
        ></input>
        <button
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          type="submit"
          className={styles.button}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default connect(null, {
  getSearchedCountries,
})(Searcher);
