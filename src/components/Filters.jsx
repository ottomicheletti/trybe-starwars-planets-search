import React, { useContext, useState, useEffect } from 'react';
import { StarWarsContext } from '../contexts/StarWarsContext';

const Filters = () => {
  const { data, setFilteredPlanets } = useContext(StarWarsContext);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

  useEffect(
    () => setFilteredPlanets(
      data.filter((planet) => planet.name.includes(filters.filterByName.name)),
    ),
    [data, filters, setFilteredPlanets],
  );

  return (
    <div>
      <h1>Projeto Star Wars - Trybe</h1>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target: { value } }) => setFilters((prevState) => ({
          ...prevState,
          filterByName: { name: value },
        })) }
      />
      {/* <form action="submit">TESTE</form> */}
    </div>
  );
};

export default Filters;
