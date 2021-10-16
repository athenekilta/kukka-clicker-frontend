import React, { useMemo } from "react";

const QUOTES = [
  {value: 0, options: ["kasvata kukkaa klikkaamalla"] },
  {value: 100, options: ["kukka alkaa kasvamaan"] },
  {value: 200, options: ["onpa iso kukka"] },
  {value: 420, options: ["blazing"] },
  {value: 1000000000, options: ["ai saaataaaanaaaaa"] },
].sort((l, r) => r.value - l.value);

const GameQuote = ({ score = 0 }) => {
  const quote = useMemo(() => {
    const options = QUOTES.find((q) => q.value <= score).options;
    return options[Math.floor(Math.random() * options.length)];
  }, [score]);

  return <p className="text-base text-gray-700">&quot;{quote}&quot;</p>;
};

export default GameQuote;