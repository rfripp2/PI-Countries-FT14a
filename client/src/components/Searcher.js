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
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          className={styles.searcher}
          placeholder="Search Countries"
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
          className={styles.buttonSearch}
        >
          <p className={styles.searcherP}>Search</p>
        </button>
      </form>
    </div>
  );
}

export default connect(null, {
  getSearchedCountries,
})(Searcher);
