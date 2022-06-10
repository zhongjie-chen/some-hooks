import React, { useCallback, useState } from "react";
import useDebounceFn, { debounce } from "../hooks/useDebounceFn";
import useUpdate from "../hooks/useUpdate";

const UseDebounceFnDemo = () => {
  const update = useUpdate();
  const [count, setCount] = useState(0);
  function add() {
    setCount(count + 1);
  }
  const fn0 = debounce(add, 500);
  const fn1 = debounce(add, 500);
  const fn2 = useDebounceFn(add, 500);
  console.log("render");
  return (
    <div>
      <div>count: {count}</div>
      <div>
        <button
          onClick={() => {
            fn0();
          }}
        >
          fn0
        </button>
        <button
          onClick={() => {
            update()
            fn1();
          }}
        >
          fn1
        </button>
        <button
          onClick={() => {
            update()
            fn2();
          }}
        >
          fn2
        </button>
      </div>
    </div>
  );
};

export default UseDebounceFnDemo;
