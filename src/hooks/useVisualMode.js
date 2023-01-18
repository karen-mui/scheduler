import { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode)
    if (replace) {
      setHistory(prev => prev.slice(0, -1))
      setHistory(prev => [...prev, newMode])
    } else {
      setHistory(prev => [...prev, newMode])
    }
  };

  const back = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
      setMode(history[history.length-2]);
    } else if (history.length <= 1) {
      setMode(mode);
    }
  };

  return { mode, transition, back };

}