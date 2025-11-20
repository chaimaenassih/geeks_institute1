import React, { useState, useEffect } from "react";

function Clock() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const tick = () => {
    setCurrentDate(new Date());
  };

  useEffect(() => {
    const intervalId = setInterval(tick, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      style={{
        display: "inline-block",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>Hello, world!</h2>
      <p>
        It is{" "}
        {currentDate.toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        })}
        .
      </p>
    </div>
  );
}

export default Clock;
