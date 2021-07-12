import React from "react";
import { NavLink } from "react-router-dom";
export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/countries">Countries</NavLink>
        </li>
        <li>
          <NavLink to="/activities">Create Activity</NavLink>
        </li>
      </ul>
    </nav>
  );
}
