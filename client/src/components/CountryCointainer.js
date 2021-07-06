import React from "react";
export function CountryCointainer({ name, continent, flag }) {
  return (
    <ul>
      <li>
        <h3>{name}</h3>
        <h4>{continent}</h4>
        <img src={flag}></img>
      </li>
    </ul>
  );
}
