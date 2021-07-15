import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
export default function Nav() {
  return (
    <nav>
      <ul className={styles.removeUlStyles}>
        <li>
          <NavLink className={styles.link} to="/countries">
            <h3>Countries</h3>
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to="/activities">
            <h3>Create Activity</h3>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
