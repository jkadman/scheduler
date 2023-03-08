import React, { useState } from "react";

export default function useVisualMode(initial) { 
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      history.shift
    } else {
      setHistory(prev => [...prev, newMode]);
    }
    console.log('newMode', newMode)
    setMode(newMode);
    console.log('mode', mode)
  }

  //When transition is called, we need to add the new mode to our history.
//When back is called, we should set the mode to the previous item in our history array.
// 

  const back = () => { 
    if (history.length > 1) {
    const newHistory = history;
    newHistory.pop()
    setHistory(newHistory);
    setMode(newHistory[newHistory.length - 1]);
    }
  }

  return { mode, transition, back }
}

