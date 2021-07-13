import React from "react";
import styles from "./CountryContainer.module.css";
import { Link } from "react-router-dom";
export function CountryCointainer({ name, continent, flag, ID }) {
  return (
    <ul>
      <li>
        <Link to={`/countries/${ID}`}>
          <h3>{name}</h3>
        </Link>
        <h4>{continent}</h4>
        <img alt={`${name} flag`} className={styles.imgSize} src={flag}></img>
      </li>
    </ul>
  );
}
