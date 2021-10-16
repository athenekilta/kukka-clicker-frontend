import React, { useMemo } from "react";

const Score = ({ value }) => {
  const format = (value) => {
    let v = value;
    let u = "metriä";
    const siP = {
      0: "",
      3: "kilo",
      6: "mega",
      9: "giga",
      12: "tera",
      15: "peta",
      18: "eksa",
      21: "tsetta",
      24: "jotta",
    };
    if (value < 0.01) {
      v = (value * 1000).toFixed(1);
      u = "milli";
    } else if (value < 1) {
      v = (value * 100).toFixed(1);
      u = "sentti";
    } else {
      const expStr = value.toExponential();
      const power = parseInt(expStr.split("+")[1]);
      const power3 = power - power % 3;
      v = (value / Math.pow(10, power3)).toFixed(2 - power % 3);
      if (siP[power3] || siP[power3] === "")
        u = siP[power3];
      else
        u = `* 10^${power3} `;
    }
    return {
      value: v.toString().replace(".", ","),
      unit: " " + u + "metriä",
    };
  };
  const formatted = useMemo(() => {
    if (value == null) {
      return {
        value: "Loading...",
        unit: "",
      };
    }
    return format(value);
  }, [value]);

  return (
    <span className="score">
      <span className="score-value">{ formatted.value }</span>
      <span>{ formatted.unit }</span>
    </span>
  );
};

export default Score;
