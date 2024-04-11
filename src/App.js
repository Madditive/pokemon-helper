import React from 'react';
import './App.css';
import RandomPokemon from './components/RandomPokemon';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokemon Helper</h1>
      </header>
      <RandomPokemon />
    </div>
  );
}

export default App;
