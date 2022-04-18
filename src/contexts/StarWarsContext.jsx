import React, { createContext, useState, useEffect } from "react";

export const StarWarsContext = createContext(null);

export const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchPlanets = async () => {
    const response = await fetch(
      "https://swapi-trybe.herokuapp.com/api/planets/?format=json"
    );
    const { results } = await response.json();
    const newPlanets = results.filter((planet) => delete planet.residents);
    return setData(newPlanets);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <StarWarsContext.Provider value={data}>{children}</StarWarsContext.Provider>
  );
};
