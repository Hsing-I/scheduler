import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) setHistory(prev => ([...prev.slice(0, -1)]));
    setHistory(prev => ([...prev, newMode]));
    console.log("last line transition", newMode, history);
  };

  function back() {
    console.log("back", history);
    if (history.length < 2) return;
    setHistory(prev => [...prev.slice(0, -1)]);
    console.log("last line back", history);
  };

  console.log("history", history);
  return { mode: history[history.length - 1], transition, back };
};