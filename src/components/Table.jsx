import React, { useContext, useState, useEffect } from 'react';
import { StarWarsContext } from '../contexts/StarWarsContext';

const Table = () => {
  const data = useContext(StarWarsContext);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => setFilteredPlanets(data), [data]);

  return (
    <div>
      <h1>Projeto Star Wars - Trybe</h1>
      {data.length === 0 ? (
        <div>Carregando...</div>
      ) : (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key, index) => (
                <th key={ index }>
                  {key === 'url'
                    ? key.toUpperCase()
                    : key
                      .replace('_', ' ')
                      .replace(/^[a-z]{1}|\s\S/g, (caracter) => caracter.toUpperCase())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredPlanets.map((planet, index) => (
              <tr key={ index }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
