import React, { useEffect, useCallback, useRef } from 'react';
import { logout } from '../../services/userService';

const events = [
  'load',
  'mousemove',
  'mousedown',
  'click',
  'scroll',
  'keypress',
];

export default function AppLogout({ children }) {
  const timerRef = useRef(null);

  const handleLogoutTimer = useCallback(() => {
    clearTimeout(timerRef.current); // Clears the existing timer

    timerRef.current = setTimeout(() => {
      logout(); // Perform the logout action
    }, 3600000);
  }, []);

  const resetTimer = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleLogoutTimer, 3600000); // Start the timer again after 10 seconds of inactivity
  }, [handleLogoutTimer]);

  useEffect(() => {
    resetTimer(); // Start the initial timer

    // Add event listeners to reset the timer on activity
    events.forEach((item) => {
      window.addEventListener(item, resetTimer);
    });

    return () => {
      // Clean up the event listeners when the component unmounts
      events.forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
    };
  }, [resetTimer]);

  return <>{children}</>;
}
