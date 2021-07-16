import React from "react";
import styles from "./ActivityContainer.module.css";
import { capitalizeFirstLetter } from "../utils/Filters-utils";
export function ActivityContainer({ name, dificulty, duration, season }) {
  name = capitalizeFirstLetter(name);
  season = capitalizeFirstLetter(season);
  return (
    <div className={styles.container}>
      {console.log(name)}
      <h3>{name}</h3>
      <h3>Dificulty: {dificulty}</h3>
      <h3>Duration: {duration}</h3>
      <h3>Season: {season}</h3>
    </div>
  );
}
