import { useState } from 'react';

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory((past) => [...past, newMode]);

    if (replace === true) {
      history.pop();
      setHistory(history);
      setHistory((past) => [...past, newMode]);
    }
  };

  const back = () => {
    if (history.length > 1) {
      history.pop();
      setHistory(history);
      
      setMode(history[history.length-1]);
    }
  };

  return { mode, transition, back };
}