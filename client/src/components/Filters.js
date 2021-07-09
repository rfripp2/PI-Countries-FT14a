import React, { useState } from "react";
import { filteredCountries } from "../actions/actions";
import { connect } from "react-redux";

const continents = [
  {
    id: "Africa",
    name: "Africa",
  },
  {
    id: "Asia",
    name: "Asia",
  },
  {
    id: "Americas",
    name: "Americas",
  },
  {
    id: "Europe",
    name: "Europe",
  },
  {
    id: "Oceania",
    name: "Oceania",
  },
];

export function Filters(props) {
  const [filters, setFilters] = useState({
    continent: "",
    orderBy: "",
    order: "",
    page: 0,
  });
  let { continent, orderBy, order, page } = filters;

  function handleOnChange(e) {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(filters);
    setFilters({
      ...filters,
      page: 0,
    });
    props.filteredCountries(continent, orderBy, order, (page = 0));
  }

  function handleLeftPage(e) {
    if (page != 0) {
      setFilters({
        ...filters,
        page: --page,
      });
    }
    e.preventDefault();
    props.filteredCountries(continent, orderBy, order, page);
  }

  function handleRightPage(e) {
    setFilters({
      ...filters,
      page: ++page,
    });
    e.preventDefault();
    props.filteredCountries(continent, orderBy, order, page);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          {continents.map((x) => {
            return (
              <label key={x.id}>
                <input
                  type="radio"
                  checked={filters.continent === x.name}
                  value={x.name}
                  name="continent"
                  onChange={handleOnChange}
                ></input>
                <span>{x.name}</span>
              </label>
            );
          })}

          {props.activities.map((x) => {
            return (
              <label key={x.name}>
                <input type="radio"></input>
                <span>{x.name}</span>
              </label>
            );
          })}
        </div>
        <div>
          <label>Order by name :</label>
          <input
            type="radio"
            checked={filters.orderBy === "name"}
            value="name"
            name="orderBy"
            onChange={handleOnChange}
          ></input>
          <label>Order by population :</label>
          <input
            type="radio"
            checked={filters.orderBy === "population"}
            value="population"
            name="orderBy"
            onChange={handleOnChange}
          ></input>
        </div>
        <div>
          <label>Asc :</label>
          <input
            type="radio"
            checked={filters.order === "ASC"}
            value="ASC"
            name="order"
            onChange={handleOnChange}
          ></input>
          <label>Desc :</label>
          <input
            type="radio"
            checked={filters.order === "DESC"}
            value="DESC"
            name="order"
            onChange={handleOnChange}
          ></input>
        </div>
        <button
          type="submit"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          Search{" "}
        </button>
      </form>
      <button
        type="submit"
        onClick={(e) => {
          handleLeftPage(e);
        }}
      >
        {"<"}
      </button>
      <button
        type="submit"
        onClick={(e) => {
          handleRightPage(e);
        }}
      >
        {">"}
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    activities: state.activities,
  };
}

export default connect(mapStateToProps, {
  filteredCountries,
})(Filters);
