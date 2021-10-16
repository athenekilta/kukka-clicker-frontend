import React, { useMemo } from "react";

const Score = ({ value }) => {
  const formatted = useMemo(() => {
    if (value == null) {
      return {
        value: "Loading...",
        unit: "",
      };
    }
    return {
      value: Math.floor(value),
      unit: " metriä",
    };
  }, [value]);

  return (
    <span className="score">
      <span className="score-value">{ formatted.value }</span>
      <span>{ formatted.unit }</span>
    </span>
  );
};

export default Score;
