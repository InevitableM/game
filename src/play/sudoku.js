import React, { use } from 'react';
import ReactDOM from 'react-dom/client';
import '../css/sudoku.css';
import {useState, useEffect} from 'react';

export default function Sudoku(){
  const [sudoku,setsudoku]=useState([]);
  const [ans,setans]=useState([]);
  const [difficulty,setdifficulty]=useState('easy');

  function generate(difficulty) {
    const grid= Array.from({length:9},()=>Array.from({length:9},()=>0));
    fill(grid);
    generatePuzzle(grid,difficulty);
    return grid;
}
function ansval(grid){
    const copy=grid.map(row=>row.slice());
     fill(copy);
     return copy;
}
useEffect(()=>{
    const newg=generate(difficulty);
    setsudoku(newg);
    setans(ansval(newg));
},[difficulty]);
function fill(grid){
    const empt=empty(grid);
    if(!empt){return true;}
    const {i,j}=empt;
      const number=shuffle([1,2,3,4,5,6,7,8,9]);
      for(let n of number){
       if(valid(grid,i,j,n)){
        grid[i][j]=n;
        if(fill(grid)){
            return true;
        }
        grid[i][j]=0;
       }
      }
        return false;
}
function empty(grid){
for(let i=0;i<9;i++){
    for(let j=0;j<9;j++){
        if(grid[i][j]===0){
            return {i,j};
        }
    }
}
}
function valid(grid,i,j,n){
    for(let x=0;x<9;x++){
        if(grid[i][x]===n || grid[x][j]===n){
            return false;
        }
    }
    const a=Math.floor(i/3)*3;
    const b=Math.floor(j/3)*3;
    for(let x=0;x<3;x++){
        for(let y=0;y<3;y++){
            if(grid[a+x][b+y]===n){
                return false;
            }
        }
    }
    return true;
}
 function shuffle(grid){
    for(let i=grid.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [grid[i],grid[j]]=[grid[j],grid[i]];
    }
    return grid;
 }  

 function generatePuzzle(grid, difficulty) {
    let count;
    if (difficulty === 'easy') count = 81 - 45;
    else if (difficulty === 'medium') count = 81 - 35;
    else if (difficulty === 'hard') count = 81 - 25;

    while (count > 0) {
        const i = Math.floor(Math.random() * 9);
        const j = Math.floor(Math.random() * 9);
        if (grid[i][j] !== 0) {
            grid[i][j] = 0;
            count--;
        }
    }
}


    const check = (e, i, j) => {
        const value = e.target.value;
        if (value === '' || (value >= 1 && value <= 9)) {
            const newSudoku = sudoku.map(row => row.slice());
            newSudoku[i][j] = value === '' ? 0 : parseInt(value);
            setsudoku(newSudoku);
        }
        if (value !== '' && parseInt(value) !== ans[i][j]) {
            e.target.style.background = 'red';
        } else if (value !== '' && parseInt(value) === ans[i][j]) {
            e.target.style.color = 'black';
        } else {
            e.target.style.background = 'white';
        }

         if (sudoku === ans) {
            alert('Solved');}

    };

    return(
        <div className='sudoku-container'>
        <h1 className='heading'>Sudoku</h1>
        <select value={difficulty} onChange={(e)=>setdifficulty(e.target.value)}>
        <option value='easy'>Easy</option>
        <option value='medium'>Medium</option>
        <option value='hard'>Hard</option>
        </select>
        <button onClick={()=>setsudoku(generate('easy'))}>New Game</button>
   <div className='sudoku-grid'>
  {
    sudoku.map((row,i)=>{
        return(
            <div key={i} className='sudoku-row'>
                {
                row.map((cell,j)=>{
                return(
                 <input key={j} type="text" value={cell || ''} className='sudoku-cell'
                 onChange={(e)=>check(e,i,j)} />
              )
               })
                }  
            </div>
        )
    })
  }
   </div>
   </div>
    );
}
