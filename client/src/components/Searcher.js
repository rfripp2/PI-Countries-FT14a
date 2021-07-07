import React, { useState } from "react";
import { getSearchedCountries } from "../actions/actions";
import { connect } from "react-redux";

export function Searcher(props) {
  const [country, setCountry] = useState("");
  const handleOnChange = (e) => {
    setCountry(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setCountry("");
    console.log(props);
    props.getSearchedCountries(country);
  }
  return (
    <div>
      <h2>Search Countries</h2>
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
