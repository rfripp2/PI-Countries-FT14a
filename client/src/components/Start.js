import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Start.module.css";
export default function Start() {
  return (
    <div className={styles.background}>
      <button className={styles.button}>
        <NavLink className={styles.link} exact to="/countries">
          <h2 className={styles.link}>Go to app</h2>
        </NavLink>
      </button>
    </div>
  );
}
