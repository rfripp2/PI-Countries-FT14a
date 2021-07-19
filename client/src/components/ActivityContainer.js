import React from "react";
import styles from "./ActivityContainer.module.css";
import { capitalizeFirstLetter } from "../utils/Country-Container-utils";
export function ActivityContainer({ name, dificulty, duration, season }) {
  name = capitalizeFirstLetter(name);
  season = capitalizeFirstLetter(season);
  return (
    <div className={styles.container}>
      {console.log(name)}
      <h3 className={styles.name}>{name}</h3>
      <h3 className={styles.secondary}>Dificulty: {dificulty}</h3>
      <h3 className={styles.secondary}>Duration: {duration}</h3>
      <h3 className={styles.secondary}>Season: {season}</h3>
    </div>
  );
}
