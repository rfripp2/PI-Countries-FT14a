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
    //console.log(filters);
    page = 1;
    if (continent && continent !== "" && displays.cont) {
      console.log("here?");
      setFilters({
        ...filters,
        activity: false,
        page,
      });
      setOffset((offset = 0));
      props.filteredCountries(continent, orderBy, order, page, offset);
    }

    if (activity && activity !== "" && displays.act) {
      page = 1;
      setFilters({
        ...filters,
        continent: false,
        page,
      });
      setOffset((offset = 0));
      props.filteredActivities(activity, orderBy, order, page, 10);
    }
  }

  function handleLeftPage(e) {
    e.preventDefault();
    if (offset !== 0) {
      offset -= 10;
      page--;
      setOffset(offset);
      setFilters({
        ...filters,
        page,
      });
    }
    if (continent && continent !== "" && displays.cont) {
      return props.filteredCountries(continent, orderBy, order, page, offset);
    }
    if (activity && activity !== "" && displays.act) {
      return props.filteredActivities(activity, orderBy, order, page, 10);
    }
  }

  function handleRightPage(e) {
    e.preventDefault();
    if (page * 10 < props.total) {
      offset += 10;
      page++;
      setOffset(offset);
      setFilters({
        ...filters,
        page,
      });

      if (continent && continent !== "" && displays.cont) {
        return props.filteredCountries(continent, orderBy, order, page, offset);
      }
      if (activity && activity !== "" && displays.act) {
        return props.filteredActivities(activity, orderBy, order, page, 10);
      }
    }
  }

  return (
    <div>
      <button
        className={displays.cont ? styles.activated : styles.buttonDefault}
        type="button"
        name="cont"
        value={displays.cont}
        onClick={handleDisplay}
      >
        Filter by Continent
      </button>
      <button
        className={displays.act ? styles.activated : styles.buttonDefault}
        type="button"
        name="act"
        value={displays.act}
        onClick={handleDisplay}
      >
        Filter by Activity
      </button>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className={!displays.cont ? styles.hide : ""}>
          {continents.map((x) => {
            return (
              <label key={x.id} className={styles.label}>
                <span>
                  {" "}
                  <p className={styles.spanText}>{x.name}</p>
                </span>
                <input
                  type="radio"
                  checked={filters.continent === x.name}
                  value={x.name}
                  name="continent"
                  onChange={handleOnChange}
                ></input>
              </label>
            );
          })}
        </div>
        <div className={!displays.act ? styles.hide : ""}>
          {uniqueActivities.map((x) => {
            return (
              <label key={x}>
                {" "}
                <span>
                  <p className={styles.spanText}>{x}</p>
                </span>
                <input
                  name="activity"
                  type="radio"
                  checked={filters.activity === x}
                  value={x}
                  onChange={handleOnChange}
                ></input>
              </label>
            );
          })}
        </div>
        <div className={!displays.act && !displays.cont ? styles.hide : ""}>
          <label>
            <span className={styles.spanText}>
              <p className={styles.spanText}>By name:</p>
            </span>
          </label>
          <input
            type="radio"
            checked={filters.orderBy === "name"}
            value="name"
            name="orderBy"
            onChange={handleOnChange}
          ></input>
          <label>
            <span>
              <p className={styles.spanText}>By population:</p>
            </span>
          </label>
          <input
            type="radio"
            checked={filters.orderBy === "population"}
            value="population"
            name="orderBy"
            onChange={handleOnChange}
          ></input>
        </div>
        <div className={!displays.act && !displays.cont ? styles.hide : ""}>
          <label>
            <p className={styles.spanText}>Asc :</p>
          </label>
          <input
            type="radio"
            checked={filters.order === "ASC"}
            value="ASC"
            name="order"
            onChange={handleOnChange}
          ></input>
          <label>
            <p className={styles.spanText}>Desc :</p>
          </label>
          <input
            type="radio"
            checked={filters.order === "DESC"}
            value="DESC"
            name="order"
            onChange={handleOnChange}
          ></input>
        </div>
        <div className={!displays.act && !displays.cont ? styles.hide : ""}>
          <button
            className={styles.button}
            type="submit"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <p className={styles.p}>Search</p>{" "}
          </button>
        </div>
      </form>
      <div className={!displays.act && !displays.cont ? styles.hide : ""}>
        <button
          className={styles.buttonPage}
          type="button"
          onClick={handleLeftPage}
        >
          <p className={styles.p}> {"<"}</p>
        </button>
        <button
          className={styles.buttonPage}
          type="button"
          onClick={handleRightPage}
        >
          <p className={styles.p}>{">"}</p>
        </button>
      </div>
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
