import React, { useState } from "react";

const continents = [
  {
    id: "Africa",
    name: "Africa",
  },
  {
    id: "Asia",
    name: "Asia",
  },
  {
    id: "Americas",
    name: "Americas",
  },
  {
    id: "Europe",
    name: "Europe",
  },
  {
    id: "Oceania",
    name: "Oceania",
  },
];
export default function Filters(props) {
  const [continent, setContinent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(continent);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          {continents.map((x) => {
            return (
              <label key={x.id}>
                <input
                  type="radio"
                  checked={continent === x.name}
                  value={x.name}
                  onChange={(e) => {
                    setContinent(e.target.value);
                  }}
                ></input>
                <span>{x.name}</span>
              </label>
            );
          })}
        </div>
        <button type="submit" onClick={handleSubmit}>
          Search{" "}
        </button>
      </form>
    </div>
  );
}
