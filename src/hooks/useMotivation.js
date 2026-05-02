import { useEffect, useState } from 'react';

export function useMotivation() {
  const [quote, setQuote] = useState({
    text: 'Small wins count when they are completed consistently.',
    author: 'Project fallback'
  });
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let isMounted = true;

    async function loadQuote() {
      try {
        const response = await fetch('https://api.quotable.io/random?tags=motivational');
        if (!response.ok) throw new Error('Quote API failed');

        const data = await response.json();
        if (isMounted) {
          setQuote({
            text: data.content,
            author: data.author
          });
          setStatus('ready');
        }
      } catch {
        if (isMounted) {
          setStatus('fallback');
        }
      }
    }

    loadQuote();

    // Cleanup avoids updating state if the report route is left before the API finishes.
    return () => {
      isMounted = false;
    };
  }, []);

  return { quote, status };
}
