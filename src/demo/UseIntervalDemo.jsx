import React, { useState } from "react";
import useInterval from "../hooks/useInterval";

const UseIntervalDemo = () => {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState();
  useInterval(() => {
    setCount(count + 1);
  }, delay);
  return (
    <div>
      <div>count:{count}</div>
      <div>
        <button
          onClick={() => {
            setDelay(1000);
          }}
        >
          开始
        </button>
        <button
          onClick={() => {
            setDelay(null);
          }}
        >
          暂停
        </button>
      </div>
    </div>
  );
};

export default UseIntervalDemo;
