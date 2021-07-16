import React from "react";
import styles from "./ActivityContainer.module.css";

export function ActivityContainer({ name, dificulty, duration, season }) {
  name = name.charAt(0).toUpperCase() + name.slice(1);
  season = season.charAt(0).toUpperCase() + season.slice(1);
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
