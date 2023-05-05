import { useCallback, useEffect, useState } from 'react';

function useIsTabVisible() {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = useCallback(() => {
    setIsVisible(!document.hidden);
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [handleVisibility]);

  return isVisible;
}

export default useIsTabVisible;
