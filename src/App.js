import React from 'react';
import './App.css';
import { StarWarsProvider } from './contexts/StarWarsContext';
import Table from './components/Table';
import Filters from './components/Filters';

function App() {
  return (
    <StarWarsProvider>
      <Filters />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
