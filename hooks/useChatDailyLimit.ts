import { useState, useEffect } from 'react';

const TOTAL_CALLS = 30;
//const CALLS_REMAINING_KEY = 'daily_calls_remaining';
//const LAST_RESET_DATE_KEY = 'last_reset_date';

//export const useDailyLimit = () => {
  export const useDailyLimit = (userId?: string) => {
  const CALLS_REMAINING_KEY = `daily_calls_remaining_${userId}`;
  const LAST_RESET_DATE_KEY = `last_reset_date_${userId}`;
  const [callsRemaining, setCallsRemaining] = useState(TOTAL_CALLS);

  useEffect(() => {
    if (!userId) return;
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const lastResetDate = localStorage.getItem(LAST_RESET_DATE_KEY);

    // If it's a new day or the user's first visit, reset the count
    if (lastResetDate !== today) {
      localStorage.setItem(LAST_RESET_DATE_KEY, today);
      localStorage.setItem(CALLS_REMAINING_KEY, TOTAL_CALLS.toString());
      setCallsRemaining(TOTAL_CALLS);
    } else {
      // Otherwise, load the existing count from local storage
      const storedCount = localStorage.getItem(CALLS_REMAINING_KEY);
      if (storedCount) {
        setCallsRemaining(parseInt(storedCount, 10));
      }
    }
  //}, []); // The empty array ensures this runs only once on initial load
      }, [userId, CALLS_REMAINING_KEY, LAST_RESET_DATE_KEY]);

  // Function to decrement the count
  const decrementCalls = () => {
    setCallsRemaining(prevCount => {
      const newCount = prevCount > 0 ? prevCount - 1 : 0;
      localStorage.setItem(CALLS_REMAINING_KEY, newCount.toString());
      return newCount;
    });
  };

  // Check if the user can make a call
  const canMakeCall = callsRemaining > 0;

  return { callsRemaining, canMakeCall, TOTAL_CALLS, decrementCalls };
};
