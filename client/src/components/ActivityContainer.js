import React from "react";
export function ActivityContainer({ name, dificulty, duration, season }) {
  return (
    <div>
      <h3>{name}</h3>
      <h3>Dificulty: {dificulty}</h3>
      <h3>Duration: {duration}</h3>
      <h3>Season: {season}</h3>
    </div>
  );
}
