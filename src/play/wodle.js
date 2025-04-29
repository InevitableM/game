import { useState,useEffect, useRef, createRef } from "react";
import words from 'an-array-of-english-words';
import React from "react";
import '../css/wordle.css';
const oned=24*60*60*1000;
export default function Wordle(){
    const val=words.filter((word) => word.length === 5);
   const [randomword]=useState(val[Math.floor(Math.random() * val.length)]);
   const [guess,setguess]=useState(Array(6).fill(''));
   const [curr,setcurr]=useState('');
   const [isenter,setisenter]=useState(Array(6).fill(false));

   useEffect(()=>{
     const handlekey=(e)=>{
      if(/^[a-z]$/.test(e.key))
        {if(curr.length<5){
        setcurr(prev=>prev+e.key);
        }}
        else if(e.key==='Backspace'){
          setcurr(prev=>prev.slice(0,-1));
        }
        else if(e.key==='Enter'){
          let temp=false;
          let l=0,r=val.length-1;
          while(l<=r){
            const mid=Math.floor((l+r)/2);
            if(curr===val[mid]){
              temp=true;break;
            }
            else if(curr<val[mid]){
              r=mid-1;
            }
            else{
              l=mid+1;
            }
          }
  
          if(curr===randomword){            
            alert('You guessed the word!');
            setguess(prev=>{
              const newguess=[...prev];
              newguess[prev.indexOf('')]=curr;
              return newguess;
            });
            setisenter(prev=>
              {
                const newisenter=[...prev];
                newisenter[prev.indexOf(false)]=true;
                return newisenter;
              }
              )
            setcurr('');
          }
          else if(temp){
            setguess(prev=>{
              const newguess=[...prev];
              newguess[prev.indexOf('')]=curr;
              return newguess;
            });
            setisenter(prev=>
            {
              const newisenter=[...prev];
              newisenter[prev.indexOf(false)]=true;
              return newisenter;
            }
          )
            if (guess[4]!=='') {
            alert('All guesses are used! The correct word was: ' + randomword);
            }
          setcurr('');
        }
          
          else{
            alert('Not a valid word!');
          }
        }
     }
     window.addEventListener('keydown',handlekey);
      return () => {
          window.removeEventListener('keydown',handlekey);
      }
  
   },[curr]);

 return (
    <div>
      <h1>Wordle</h1> 
    {guess.map((guesss,i)=>{
      const iscurr=i===guess.findIndex((g)=>g==='')?true:false;
      const status=isenter[i];
     return (
    <div key={i}><Tiles word={iscurr ? curr :guesss ?? ""

    } ans={randomword} enter={status}/></div>
            )
        })
    }
    </div>
     ); 
}

function Tiles({word,ans,enter}){
    const entry=[];
    const marked=[];
    const lettercount={};
    for(let i=0;i<5;i++){
        lettercount[ans[i]]=(lettercount[ans[i]] || 0)+1;
    }
    if(enter){for(let i=0;i<5;i++){
       if(word[i]===ans[i])
        {entry[i]=<div className="tile1 flipped" key={i}>{word[i]}</div>;
      marked[i]=true;
    lettercount[ans[i]]--;}
       else{
        marked[i]=false;
        entry[i]=null;
       }
    }
    for(let i=0;i<5;i++){
      if(!marked[i]){
       if(lettercount[word[i]]>0){
        entry[i]=<div className="tile2 flipped" key={i}>{word[i]}</div>;
        lettercount[word[i]]--;
      }
      else{
        entry[i]=<div className="tile3 flipped" key={i}>{word[i]}</div>;
      }
    }
  }
}
  else{
    for(let i=0;i<5;i++){
      entry[i]=<div className="tile3 flipped" key={i}>{word[i]}</div>;
    }
  }
  return (
    <div className="entry">
        {entry}
    </div>
  );
}