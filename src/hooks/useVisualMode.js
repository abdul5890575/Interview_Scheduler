import React ,{ useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newmode, replace = false) =>{
    if (replace) {
        setMode(newmode)
        let shortHistory = history
        shortHistory.pop()
        setHistory([...shortHistory,newmode])
    } else {
        setMode(newmode)
        const newHistory = [...history,newmode]
        setHistory(newHistory)
    }
  }
  
  const back = () =>{
    if (history.length === 1) {
      return
    } else{
        let shortHistory = history
        shortHistory.pop()
        setMode(shortHistory[shortHistory.length-1] );
        setHistory(shortHistory)
    }
  }
    return { mode , transition, back};
}