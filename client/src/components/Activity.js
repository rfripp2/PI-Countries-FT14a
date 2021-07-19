import React, { useState } from "react";
import styles from "./Activity.module.css";
import { connect } from "react-redux";
import { postActivity } from "../actions/actions";
import { validate } from "../utils/Activity-utils";

export function Activity(props) {
  const [values, setValues] = useState({
    name: "",
    dificulty: "",
    duration: "",
    season: "",
    country: "",
  });

  const [errors, setErrors] = useState({});

  function handleOnChange(e) {
    if ([e.target.name] === "dificulty" || [e.target.name] === "duration") {
      setValues({
        ...values,
        [e.target.name]: parseInt(e.target.value),
      });
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    }

    setErrors(
      validate({
        ...values,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(values);
    e.target.reset();
    props.postActivity(values);
    setValues({
      name: "",
      dificulty: "",
      duration: "",
      season: "",
      country: "",
    });
  }
  return (
    <div className={styles.container}>
      <h1>Post Activity</h1>
      <form type="submit" onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          className={errors.hasOwnProperty("name") ? styles.danger : undefined}
          type="text"
          name="name"
          value={props.name}
          onChange={handleOnChange}
        ></input>
        <div>{errors.name}</div>

        <input
          placeholder="Dificuty : 1-5"
          className={
            errors.hasOwnProperty("dificulty") ? styles.danger : undefined
          }
          type="number"
          name="dificulty"
          value={props.dificulty}
          onChange={handleOnChange}
        ></input>
        <div>{errors.dificulty}</div>

        <input
          placeholder="Duration"
          className={
            errors.hasOwnProperty("duration") ? styles.danger : undefined
          }
          type="number"
          name="duration"
          value={props.duration}
          onChange={handleOnChange}
        ></input>
        <div>{errors.duration}</div>

        <input
          placeholder="Season"
          className={
            errors.hasOwnProperty("season") ? styles.danger : undefined
          }
          type="text"
          name="season"
          value={props.season}
          onChange={handleOnChange}
        ></input>
        <div>{errors.season}</div>

        <div>
          <p>To add it to more than onecountry,do: Argentina,Brazil,...</p>
        </div>
        <input
          placeholder="Countries"
          className={
            errors.hasOwnProperty("country") ? styles.danger : undefined
          }
          type="text"
          name="country"
          value={props.country}
          onChange={handleOnChange}
        ></input>

        <div>{errors.country}</div>
        <button
          className={styles.button}
          type="submit"
          disabled={
            values.name.length < 1 ||
            values.dificulty.length < 1 ||
            values.duration.length < 1 ||
            values.season.length < 1 ||
            values.country.length < 1 ||
            Object.keys(errors).length
          }
        >
          <p>Add</p>
        </button>
      </form>
    </div>
  );
}

export default connect(null, {
  postActivity,
})(Activity);
