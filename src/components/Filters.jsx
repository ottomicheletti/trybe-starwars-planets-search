import React, { useContext, useState, useEffect } from 'react';
import { createNewSortInstance } from 'fast-sort';
import { StarWarsContext } from '../contexts/StarWarsContext';

const Filters = () => {
  const { data, setFilteredPlanets, filteredPlanets } = useContext(StarWarsContext);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });
  const [currentFilters, setCurrentFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [columns, setColumns] = useState({
    population: true,
    orbital_period: true,
    diameter: true,
    rotation_period: true,
    surface_water: true,
  });
  const COMPARISONS = {
    'maior que': (column, value, index) => {
      setFilteredPlanets((index > 0 ? filteredPlanets : data)
        .filter((planet) => Number(planet[column]) > Number(value)));
    },
    'menor que': (column, value, index) => {
      setFilteredPlanets((index > 0 ? filteredPlanets : data)
        .filter((planet) => Number(planet[column]) < Number(value)));
    },
    'igual a': (column, value, index) => {
      setFilteredPlanets((index > 0 ? filteredPlanets : data)
        .filter((planet) => Number(planet[column]) === Number(value)));
    },
  };
  const { filterByNumericValues } = filters;
  const numericFilters = () => {
    filterByNumericValues.map(({ comparison, column, value }, index) => (
      COMPARISONS[comparison](column, value, index)
    ));
  };
  useEffect(() => {
    setFilteredPlanets(
      data.filter((planet) => planet.name.includes(filters.filterByName.name)),
    );
  }, [filters.filterByName]);
  useEffect(() => {
    if (!filterByNumericValues[0]) {
      setFilteredPlanets([...data]);
    } else {
      numericFilters();
    }
  }, [filters.filterByNumericValues]);
  const onChange = ({ target: { name, value } }) => {
    setCurrentFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleClick = ({ target: { value, name } }) => {
    switch (name) {
    case 'delete':
      setFilters((prevState) => ({
        ...prevState,
        filterByNumericValues: [...filterByNumericValues]
          .filter((obj) => obj.column !== value),
      }));
      setColumns((prevState) => ({
        ...prevState,
        [value]: true,
      }));
      break;
    case 'filter':
      setFilters((prevState) => ({
        ...prevState,
        filterByNumericValues: [
          ...prevState.filterByNumericValues,
          currentFilters,
        ],
      }));
      setColumns((prevState) => ({
        ...prevState,
        [currentFilters.column]: false,
      }));
      break;
    case 'remove-filters':
      setFilters((prevState) => ({
        ...prevState,
        filterByNumericValues: [],
      }));
      setColumns({
        population: true,
        orbital_period: true,
        diameter: true,
        rotation_period: true,
        surface_water: true,
      });
      break;
    default:
      break;
    }
  };
  const changeOrder = ({ target: { value } }) => {
    setFilters((prevState) => (
      { ...prevState,
        order: {
          column: prevState.order.column,
          sort: value },
      }));
  };
  const naturalSort = createNewSortInstance({
    comparer: new Intl.Collator(undefined, { numeric: true }).compare,
  });
  const handleOrder = () => {
    if (filters.order.sort === 'ASC') {
      setFilteredPlanets(naturalSort(filteredPlanets)
        .asc((el) => Number(el[filters.order.column]) || 0));
    } else {
      setFilteredPlanets(naturalSort(filteredPlanets)
        .desc((el) => Number(el[filters.order.column]) || 0));
    }
  };

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
          <div key={ index } data-testid="filter">
            <p>{`${filter.column} ${filter.comparison} ${filter.value}`}</p>
            <button
              type="button"
              name="delete"
              value={ filter.column }
              onClick={ handleClick }
            >
              X
            </button>
          </div>
        ))}
      </div>
      <form>
        <select
          data-testid="column-filter"
          name="column"
          onChange={ onChange }
          value={ currentFilters.column }
        >
          {Object.entries(columns).map((column, index) => (
            column[1] ? (<option key={ index }>{column[0]}</option>) : null
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ onChange }
          value={ currentFilters.comparison }
        >
          {Object.keys(COMPARISONS).map((value, index) => (
            <option key={ index }>{value}</option>
          ))}
        </select>
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          onChange={ onChange }
          value={ currentFilters.value }
        />
        <button
          type="button"
          data-testid="button-filter"
          name="filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          name="remove-filters"
          onClick={ handleClick }
        >
          Remover Filtragens
        </button>
      </form>
      <form>
        <select
          onChange={ ({ target: { value } }) => setFilters((prevState) => (
            { ...prevState, order: { column: value, sort: prevState.order.sort } })) }
          data-testid="column-sort"
        >
          {Object.keys(columns).map((column, index) => (
            <option key={ index }>{column}</option>
          ))}
        </select>
        <div>
          <label htmlFor="ASC">
            <input
              type="radio"
              name="ASC"
              value="ASC"
              checked={ filters.order.sort === 'ASC' }
              onChange={ changeOrder }
              data-testid="column-sort-input-asc"
            />
            Ascendente
          </label>
          <label htmlFor="DESC">
            <input
              type="radio"
              name="DESC"
              value="DESC"
              checked={ filters.order.sort === 'DESC' }
              onChange={ changeOrder }
              data-testid="column-sort-input-desc"
            />
            Descendente
          </label>
        </div>
        <button
          type="button"
          onClick={ handleOrder }
          data-testid="column-sort-button"
        >
          Ordenar
        </button>
      </form>
    </div>
  );
};

export default Filters;
