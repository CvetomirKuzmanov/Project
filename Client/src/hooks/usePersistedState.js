import { useState } from "react";

export default function usePersistedState(stateKey, initialState) {
  const [state, setState] = useState(() => {
    try {
      const persistedState = localStorage.getItem(stateKey);
      
      if (!persistedState || persistedState === "undefined") {
        return typeof initialState === 'function'
          ? initialState()
          : initialState;
      }
      
      return JSON.parse(persistedState);
    } catch (error) {
      console.error(`Error parsing stored data for key "${stateKey}":`, error);
      
      localStorage.removeItem(stateKey);
      
      return typeof initialState === 'function'
        ? initialState()
        : initialState;
    }
  });

  const setPersistedState = (input) => {
    try {
      const data = typeof input === 'function'
        ? input(state)
        : input;
        
      if (data !== undefined) {
        const persistedData = JSON.stringify(data);
        localStorage.setItem(stateKey, persistedData);
      }
      
      setState(data);
    } catch (error) {
      console.error(`Error saving state for key "${stateKey}":`, error);
      setState(typeof input === 'function' ? input(state) : input);
    }
  };

  return [
    state,
    setPersistedState,
  ];
}