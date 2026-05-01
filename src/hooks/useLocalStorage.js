import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue) {
      return JSON.parse(savedValue);
    }

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    // The dependency array keeps storage in sync only when this exact value or key changes.
  }, [key, value]);

  return [value, setValue];
}
