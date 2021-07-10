import React, { useState } from "react";
import { filteredCountries } from "../actions/actions";
import { connect } from "react-redux";
import styles from "./Filters.module.css";
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
    activity: "",
  });
  const [displays, setDisplays] = useState({
    cont: false,
    act: false,
  });
  let { continent, orderBy, order, page } = filters;

  function handleOnChange(e) {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  }

  function handleDisplay(e) {
    e.preventDefault();
    for (const prop in displays) {
      if ([e.target.name === false]) {
        setDisplays({
          [e.target.name]: true,
        });
      }
    }
    console.log(displays);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(filters);
    setFilters({
      ...filters,
      page: 0,
      continent: "",
      orderBy: "",
      order: "",
      activity: "",
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
      <button
        className={displays.cont ? styles.activated : ""}
        type="button"
        name="cont"
        value={displays.cont}
        onClick={handleDisplay}
      >
        Filter by Continent
      </button>
      <button
        className={displays.act ? styles.activated : ""}
        type="button"
        name="act"
        value={displays.act}
        onClick={handleDisplay}
      >
        filter by Activity
      </button>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className={!displays.cont ? styles.hide : ""}>
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
        </div>
        <div className={!displays.act ? styles.hide : ""}>
          {props.activities.map((x) => {
            return (
              <label key={x.name}>
                <input
                  name="activity"
                  type="radio"
                  checked={filters.activity === x.name}
                  value={x.name}
                  onChange={handleOnChange}
                ></input>
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
