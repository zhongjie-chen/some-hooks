import { useEffect, useRef } from "react";

const usePrevious = (val) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = val;
  });
  return ref.current;
};

export default usePrevious;
