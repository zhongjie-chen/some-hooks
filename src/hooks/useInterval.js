import { useEffect, useRef } from "react";

const useInterval = (fn, delay) => {
  const savedCallback = useRef(fn);
  useEffect(() => {
    savedCallback.current = fn;
  });

  useEffect(() => {
    if (delay) {
      const timer = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => {
        clearInterval(timer);
      };
    }
  }, [delay]);
};

export default useInterval;
