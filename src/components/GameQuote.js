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
    description: "tämähän on mukavaa ajanvietettä" 
  },
  {
    value: 2000, 
    description: "viva la revolution!"
  },
  {
    value: 1e4, 
    description: "mistä nämä ravinteet on ostettu?"
  },
  {
    value: 1e5, 
    description: "onko se lintu, onko se lentokone?"
  },
  {
    value: 1e7,
    description: "nu kör vi!"
  },
  {
    value: 1e9, 
    description: "tämä planeetta on liian pieni kukan tarpeisiin" 
  },
  {
    value: 1e10, 
    description: "ai saaataaaanaaaaa" 
  },
  {
    value: 1e25, 
    description: "se on kaikkialla!!" 
  },
  {
    value: 1e27, 
    description: "mihin kasvaminen loppuu, täytyyhän sen joskus loppua" 
  },
  {
    value: 1e30, 
    description: "we are in the endgame now" 
  },
  {
    value: 1e37, 
    description: "nyt voidaan turvallisesti todeta että aika suureksi on kukka kasvanut" 
  },
].sort((l, r) => r.value - l.value);

const GameQuote = ({ score = 0 }) => {
  const quote = useMemo(() => {
    return QUOTES.find((q) => q.value <= score).description;
  }, [score]);

  return <p className="text-base text-gray-700 text-center">&quot;{quote}&quot;</p>;
};

export default GameQuote;
