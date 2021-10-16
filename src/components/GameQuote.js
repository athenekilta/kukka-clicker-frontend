import React, { useMemo } from "react";

const QUOTES = [
  {
    value: 0, 
    description: "kasvata kukkaa klikkaamalla"
  },
  {
    value: 1, 
    description: "kukka alkaa nousta penkistä" 
  },
  {
    value: 5, 
    description: "onko se puu?"
  },
  {
    value: 10, 
    description: "mänty sen on pakko olla"
  },
  {
    value: 200, 
    description: "onpa iso kukka"
  },
  {
    value: 420, 
    description: "blazing" 
  },
  {
    value: 1000, 
    description: "tämähän on mukavaa ajanviihdettä" 
  },
  {
    value: 2000, 
    description: "viva la revolution!"
  },
  {
    value: 10000, 
    description: "mistä nämä ravinteet on ostettu?"
  },
  {
    value: 100000, 
    description: "onko se lintu, onko se lentokone?"
  },
  {
    value: 1000000000, 
    description: "ai saaataaaanaaaaa" 
  },
].sort((l, r) => r.value - l.value);

const GameQuote = ({ score = 0 }) => {
  const quote = useMemo(() => {
    return QUOTES.find((q) => q.value <= score).description;
  }, [score]);

  return <p className="text-base text-gray-700">&quot;{quote}&quot;</p>;
};

export default GameQuote;