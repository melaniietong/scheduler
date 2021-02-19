import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode) => {
    setMode(newMode);
    setHistory((past) => [...past, newMode]);
  };

  const back = () => {
    let currentHistory = [...history];

    if (history.length === 1) {
      setMode(currentHistory[currentHistory.length-1])
    } else {
      currentHistory.pop();
      setHistory(currentHistory)
      
      setMode(currentHistory[currentHistory.length-1])
    }
  };

  return { mode, transition, back };
}