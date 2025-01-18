import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SnakeGame from './play/snake';
import Sudoku from './play/sudoku';
import './css/App.css';

function Home() {
  return (
    <div className="App">
      <Link to="/snake">
        <button>Snake Apple Game</button>
      </Link>
      <Link to="/sudoku">
       <button>Sudoku Game</button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Ek Aur Gamer</h1>
    <Router>
    <Routes>  <Route path="/" element={<Home />} />
    <Route path="/snake" element={<SnakeGame />} />
    <Route path="/sudoku" element={<Sudoku />} />
  </Routes>
    </Router>
    </div>
  );
}

export default App;