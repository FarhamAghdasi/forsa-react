// File: src/components/Counter.js
import React, { useEffect, useState } from 'react';

const Counter = ({ from = 0, to, speed = 3000, refreshInterval = 50 }) => {
  const [currentValue, setCurrentValue] = useState(from);

  useEffect(() => {
    let startTime = null;
    const range = to - from;
    const increment = (range / (speed / refreshInterval));

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      let newValue = Math.min(from + Math.floor(progress / refreshInterval * increment), to);
      setCurrentValue(newValue);

      if (newValue < to) {
        requestAnimationFrame(step); // Keep counting until reaching the target value
      }
    };

    const animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame); // Cleanup on unmount
  }, [from, to, speed, refreshInterval]);

  return (
    <span>
      {currentValue}
    </span>
  );
};

export default Counter;
