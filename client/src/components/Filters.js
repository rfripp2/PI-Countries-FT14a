import React, { useEffect, useState } from "react";
import {
  filteredCountries,
  getActivities,
  filteredActivities,
} from "../actions/actions";
import { continents } from "../utils/Filters-utils";
import { connect } from "react-redux";
import styles from "./Filters.module.css";

export function Filters(props) {
  useEffect(() => {
    props.getActivities();
  }, []);

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
  let { continent, activity, orderBy, order, page } = filters;

  function handleOnChange(e) {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  }

  function handleDisplay(e) {
    e.preventDefault();
    for (const _prop in displays) {
      if ([e.target.name === false]) {
        setDisplays({
          [e.target.name]: true,
        });
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(filters);
    if (continent && continent !== "" && displays.cont) {
      console.log("here?");
      setFilters({
        ...filters,
        activity: false,
        page: 0,
      });
      props.filteredCountries(continent, orderBy, order, (page = 0));
    }

    if (activity && activity !== "" && displays.act) {
      setFilters({
        ...filters,
        continent: false,
        page: 0,
      });
      props.filteredActivities(activity, orderBy, order);
    }
  }

  function handleLeftPage(e) {
    if (page !== 0) {
      setFilters({
        ...filters,
        page: --page,
      });
    }
    e.preventDefault();
    props.filteredCountries(continent, orderBy, order, page);
  }

  function handleRightPage(e) {
    console.log(page);
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
  getActivities,
  filteredActivities,
})(Filters);
