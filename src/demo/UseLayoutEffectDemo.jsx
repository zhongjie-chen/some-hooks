import React, {
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
  useRef,
} from "react";

const baseStyle = {
  width: 300,
  height: 300,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 26,
  fontWeight: "bold",
};
const useLayoutEffectDemo = () => {
  const [count, setCount] = useState(0);
  const savedBox = useRef();
  const savedBox2 = useRef();
  const bgColor = useMemo(() => {
    return getColorByCount(count);
  }, [count]);
  useEffect(() => {
    if (count === 4) {
      const box = savedBox.current;
      console.log(box.style.background);
      box.style.background = "pink";
    }
  }, [count]);
  useLayoutEffect(() => {
    /**
     * 通常是拿reflow后的数据 做下一步判断。
     */
    if (count === 4) {
      const box = savedBox2.current;
      //   console.log(box.style.background);
      box.style.background = "pink";
    }
  }, [count]);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          ref={savedBox}
          id="box"
          style={{
            ...baseStyle,
            background: bgColor,
            marginRight: 20,
          }}
        >
          Effect
        </div>
        <div
          ref={savedBox2}
          id="box2"
          style={{
            ...baseStyle,
            background: bgColor,
          }}
        >
          LayoutEffect
        </div>
      </div>
      <div>count: {count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        增加
      </button>
      <button
        onClick={() => {
          setCount(0);
        }}
      >
        重置
      </button>
    </div>
  );
};

function getColorByCount(count) {
  return ["red", "yellow", "green"][count % 3];
}

export default useLayoutEffectDemo;
