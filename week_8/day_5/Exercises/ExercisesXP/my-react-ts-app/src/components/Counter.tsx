import React, { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [lastAction, setLastAction] = useState<string>("none");

  const increment = () => {
    setCount(prev => prev + 1);
    setLastAction("incremented");
  };

  const decrement = () => {
    setCount(prev => prev - 1);
    setLastAction("decremented");
  };

  return (
    <div>
      <h3>Counter: {count}</h3>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <p>Last action: {lastAction}</p>
    </div>
  );
};

export default Counter;
