import React from "react";
import styles from "./CountryContainer.module.css";
export function CountryCointainer({ name, continent, flag }) {
  return (
    <ul>
      <li>
        <h3>{name}</h3>
        <h4>{continent}</h4>
        <img className={styles.imgSize} src={flag}></img>
      </li>
    </ul>
  );
}
