import { useCallback, useEffect, useMemo, useRef } from "react";

const useDebounceFn = (fn, ms) => {
  const savedFn = useRef(fn);
  const debounceFn = useMemo(() => {
    return debounce(() => {
      savedFn.current();
    }, ms);
  }, [ms]);
  useEffect(() => {
    savedFn.current = fn;
  }, [fn]);
  return debounceFn;
};

export default useDebounceFn;

export function debounce(fn, ms) {
  let timer = null;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, ms);
  };
}
