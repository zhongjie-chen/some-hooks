import { useEffect, useRef } from "react";
import useUpdate from "../hooks/useUpdate";
import usePrevious from "../hooks/usePrevious";

/**
 * 第一次加载的时候
 * ref.current 0; previous undefined
 * 
 * 渲染完毕执行 side effects
 * 
 * ref.current 1; previous 0;
 * 副作用执行完毕；
 * 
 * 
 */

const UseUpdateDemo = () => {
  const update = useUpdate();
  const ref = useRef(0);
  const previous = usePrevious(ref.current);
  useEffect(() => {
    ref.current = ref.current + 1;
  });

  return (
    <div>
      <button
        onClick={() => {
          update();
        }}
      >
        update
      </button>
      <div>current: {ref.current}</div>
      <div>previous: {previous}</div>
    </div>
  );
};

export default UseUpdateDemo;
