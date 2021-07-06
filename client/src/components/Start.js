import React from "react";
import { NavLink } from "react-router-dom";
export default function Start() {
  return (
    <div>
      <NavLink exact to="/countries">
        Go to App
      </NavLink>
    </div>
  );
}
