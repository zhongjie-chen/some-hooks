import { useReducer } from "react";

const useUpdate = () => {
  const [ignore, update] = useReducer((count) => {
    return count + 1;
  }, 0);
  return update;
};

export default useUpdate;
