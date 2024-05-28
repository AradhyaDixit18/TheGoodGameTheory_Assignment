// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BeerCard from './components/BeerCard';
import './App.css';

const App = () => {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get('https://api.sampleapis.com/beers/ale')
      .then(response => {
        setBeers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the beers!", error);
      });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <header>
        <h1>Beer List</h1>
        <div className="controls">
          <input 
            type="text" 
            placeholder="Search beers..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>
      <div className="beer-list">
        {filteredBeers.map(beer => (
          <BeerCard key={beer.id} beer={beer} />
        ))}
      </div>
    </div>
  );
};

export default App;
