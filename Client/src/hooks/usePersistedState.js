import { useState } from "react";

export default function usePersistedState(stateKey, initialState) {
  const [state, setState] = useState(() => {
    try {
      // Get the stored value
      const persistedState = localStorage.getItem(stateKey);
      
      // Check if the value exists and is not empty
      if (!persistedState || persistedState === "undefined") {
        return typeof initialState === 'function'
          ? initialState()
          : initialState;
      }
      
      // Try to parse the JSON data
      return JSON.parse(persistedState);
    } catch (error) {
      // If there's a parsing error, use the initial state
      console.error(`Error parsing stored data for key "${stateKey}":`, error);
      
      // Clear the invalid data
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
        
      // Only store non-undefined values
      if (data !== undefined) {
        const persistedData = JSON.stringify(data);
        localStorage.setItem(stateKey, persistedData);
      }
      
      setState(data);
    } catch (error) {
      console.error(`Error saving state for key "${stateKey}":`, error);
      // Still update the state even if persisting fails
      setState(typeof input === 'function' ? input(state) : input);
    }
  };

  return [
    state,
    setPersistedState,
  ];
}