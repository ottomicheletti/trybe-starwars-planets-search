import React, { useContext, useState, useEffect } from 'react';
import { StarWarsContext } from '../contexts/StarWarsContext';

const Filters = () => {
  const { data, setFilteredPlanets, filteredPlanets } = useContext(StarWarsContext);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });
  const [currentFilters, setCurrentFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const COMPARISONS = ['maior que', 'menor que', 'igual a'];

  useEffect(() => {
    setFilteredPlanets(
      data.filter((planet) => planet.name.includes(filters.filterByName.name)),
    );
  }, [data, filters.filterByName, setFilteredPlanets]);

  useEffect(() => {
    switch (currentFilters.comparison) {
    case 'maior que':
      return setFilteredPlanets(
        filteredPlanets.filter(
          (planet) => parseInt(planet[currentFilters.column], 10)
              > parseInt(currentFilters.value, 10),
        ),
      );
    case 'menor que':
      return setFilteredPlanets(
        filteredPlanets.filter(
          (planet) => parseInt(planet[currentFilters.column], 10)
              < parseInt(currentFilters.value, 10),
        ),
      );
    case 'igual a':
      return setFilteredPlanets(
        filteredPlanets.filter(
          (planet) => parseInt(planet[currentFilters.column], 10)
              === parseInt(currentFilters.value, 10),
        ),
      );
    default:
      return undefined;
    }
  }, [filters.filterByNumericValues]);

  const onChange = ({ target: { name, value } }) => {
    setCurrentFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      filterByNumericValues: [
        ...prevState.filterByNumericValues,
        currentFilters,
      ],
    }));
    setColumns(columns.filter((column) => column !== currentFilters.column));
  };

  const { filterByNumericValues } = filters;

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
      <div>
        {filterByNumericValues.map((filter, index) => (
          <div key={ index }>
            <p>{`${filter.column} ${filter.comparison} ${filter.value}`}</p>
            <button type="button">Deletar Filtro</button>
          </div>
        ))}
      </div>
      <form action="submit">
        <select
          data-testid="column-filter"
          name="column"
          onChange={ onChange }
          defaultValue="population"
        >
          {columns.map((column, index) => (
            <option key={ index }>{column}</option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ onChange }
          defaultValue="maior que"
        >
          {COMPARISONS.map((value, index) => (
            <option key={ index }>{value}</option>
          ))}
        </select>
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          onChange={ onChange }
          defaultValue="0"
        />
        <button type="submit" data-testid="button-filter" onClick={ onSubmit }>
          Filtrar
        </button>
      </form>
    </div>
  );
};

export default Filters;
