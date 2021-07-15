import React from "react";
import styles from "./CountryContainer.module.css";
import { Link } from "react-router-dom";
export function CountryCointainer({ name, continent, flag, ID }) {
  return (
    <div className={styles.container}>
      <ul className={styles.removeUlStyles}>
        <li>
          <Link className={styles.link} to={`/countries/${ID}`}>
            <h3 className={styles.name}>{name}</h3>
          </Link>
          <h4 className={styles.continent}>{continent}</h4>
          <img alt={`${name} flag`} className={styles.imgSize} src={flag}></img>
        </li>
      </ul>
    </div>
  );
}
