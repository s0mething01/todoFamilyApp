import { useState, useEffect } from 'react';

const useStateWithLocalStorage = (localStorageKey, defaultStateValue = '') => {
    const [value, setValue] = useState(
      localStorage.getItem(localStorageKey) || defaultStateValue
    );
   
    useEffect(() => {
      localStorage.setItem(localStorageKey, value);
    }, [value]);
   
    return [value, setValue];
  };

  export default useStateWithLocalStorage;
