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

  let uniqueActivities = [...new Set(props.activities.map((x) => x.name))];

  let [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState({
    continent: "",
    orderBy: "",
    order: "",
    page: 1,
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
        page: 1,
      });
      setOffset((offset = 0));
      props.filteredCountries(continent, orderBy, order, page, offset);
    }

    if (activity && activity !== "" && displays.act) {
      setFilters({
        ...filters,
        continent: false,
        page: 1,
      });
      setOffset((offset = 0));
      props.filteredActivities(activity, orderBy, order, page, 10);
    }
  }

  function handleLeftPage(e) {
    if (offset !== 0) {
      offset -= 10;
      page--;
      setOffset(offset);
      setFilters({
        ...filters,
        page,
      });
    }
    e.preventDefault();
    if (continent && continent !== "" && displays.cont) {
      e.preventDefault();
      props.filteredCountries(continent, orderBy, order, page, offset);
    }
    if (activity && activity !== "" && displays.act) {
      e.preventDefault();
      props.filteredActivities(activity, orderBy, order, page, 10);
    }
  }

  function handleRightPage(e) {
    /*   let nextPage = page + 1;
    {
      console.log(page, nextPage);
    } */

    if (page * 10 < props.total) {
      offset += 10;
      page++;
      setOffset(offset);
      setFilters({
        ...filters,
        page,
      });

      if (continent && continent !== "" && displays.cont) {
        e.preventDefault();
        props.filteredCountries(continent, orderBy, order, page, offset);
      }
      if (activity && activity !== "" && displays.act) {
        e.preventDefault();
        props.filteredActivities(activity, orderBy, order, page, 10);
      }
    }
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
          {uniqueActivities.map((x) => {
            return (
              <label key={x}>
                <input
                  name="activity"
                  type="radio"
                  checked={filters.activity === x}
                  value={x}
                  onChange={handleOnChange}
                ></input>
                <span>{x}</span>
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
      <button type="button" onClick={handleLeftPage}>
        {"<"}
      </button>
      <button type="button" onClick={handleRightPage}>
        {">"}
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    activities: state.activities,
    total: state.filteredCountries.count,
    filteredCountries: state.filteredCountries.rows,
  };
}

export default connect(mapStateToProps, {
  filteredCountries,
  getActivities,
  filteredActivities,
})(Filters);
