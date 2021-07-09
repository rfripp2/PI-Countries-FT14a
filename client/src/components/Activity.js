import React, { useState } from "react";
import styles from "./Activity.module.css";
import { connect } from "react-redux";
import { postActivity } from "../actions/actions";
function validate(input) {
  let errors = {};
  if (!input.name || input.name === "" || typeof input.name === "number") {
    errors.name = "Name is required and must be characters";
  } else if (
    !input.dificulty ||
    input.dificulty === "" ||
    input.dificulty > 5 ||
    input.dificulty < 1
  ) {
    errors.dificulty =
      "Dificulty is required and must be a number between 1 and 5";
  } else if (
    !input.duration ||
    input.duration === "" ||
    typeof input.duration !== "number"
  ) {
    errors.duration = "Duration is required and must be a number";
  } else if (!input.season || input.season === "") {
    errors.season = "Season is required";
  }
  return errors;
}

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
    if ([e.target.name] == "dificulty" || [e.target.name] == "duration") {
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
    setValues({
      name: "",
      dificulty: "",
      duration: "",
      season: "",
      country: "",
    });
    props.postActivity(values);
  }
  return (
    <div>
      <h1>Post Activity</h1>
      <form type="submit" onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          className={errors.hasOwnProperty("name") ? styles.danger : undefined}
          type="text"
          name="name"
          value={props.name}
          onChange={handleOnChange}
        ></input>
        <div>{errors.name}</div>
        <label>Dificulty: </label>
        <input
          className={errors.hasOwnProperty("dificulty") && styles.danger}
          type="number"
          name="dificulty"
          value={props.dificulty}
          onChange={handleOnChange}
        ></input>
        <div>{errors.dificulty}</div>
        <label>Duration: </label>
        <input
          className={
            errors.hasOwnProperty("duration") ? styles.danger : undefined
          }
          type="number"
          name="duration"
          value={props.duration}
          onChange={handleOnChange}
        ></input>
        <div>{errors.duration}</div>
        <label>Season: </label>
        <input
          className={
            errors.hasOwnProperty("season") ? styles.danger : undefined
          }
          type="text"
          name="season"
          value={props.season}
          onChange={handleOnChange}
        ></input>
        <div>{errors.season}</div>
        <label>Country: </label>
        <div>To add it to more than onecountry,do: Argentina,Brazil,...</div>
        <input
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
          type="submit"
          /* onSubmit={handleSubmit} */
          disabled={
            values.name.length < 1 ||
            values.dificulty.length < 1 ||
            values.duration.length < 1 ||
            values.season.length < 1 ||
            values.country.length < 1 ||
            Object.keys(errors).length
          }
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default connect(null, {
  postActivity,
})(Activity);
