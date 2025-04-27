import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import SnakeGame from './play/snake';
import Sudoku from './play/sudoku';
import Wordle from './play/wodle';
import './css/App.css';


function Header(){
  const location=useLocation();
  const isGameRoute = ['/'].includes(location.pathname);
  return isGameRoute ? <h1>Ek Aur Gamer</h1>:null;
}

function Home() {
  return (
    <div className="App">
      <Link to="/snake">
        <button>Snake Apple Game</button>
      </Link>
      <Link to="/sudoku">
       <button>Sudoku Game</button>
      </Link>
      <Link to="/wordle">
        <button>Wordle Game</button>
      </Link>
    </div>
  );
}

function App() {
  return (
<div className="App">
    <Router>
    <Header />
    <Routes>  <Route path="/" element={<Home />} />
    <Route path="/snake" element={<SnakeGame />} />
    <Route path="/sudoku" element={<Sudoku />} />
    <Route path="/wordle" element={<Wordle />} />
  </Routes>
    </Router>
    </div>
  );
}

export default App;
