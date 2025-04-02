import { useState, useEffect } from 'react';

/**
 * Custom hook for managing local storage state
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value
 * @returns {Array} [storedValue, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error('Error writing to localStorage:', error);
    }
  };

  // Listen for changes to the key in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
          console.error('Error parsing localStorage value:', error);
        }
      }
    };

    // Add event listener
    window.addEventListener('storage', handleStorageChange);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
};