import React, { useState } from "react";

export default function useVisualMode(initial) { 
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    setHistory(prev =>
      replace ? [...prev.slice(0, -1), mode] : [...prev, mode]
    );
  }; 

  //When transition is called, we need to add the new mode to our history.
//When back is called, we should set the mode to the previous item in our history array.
// 

const back = () => {
  setHistory(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
}; 

  return { mode: history[history.length - 1], transition, back }; 
}

// ['empty']