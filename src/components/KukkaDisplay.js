import React, { useEffect } from "react";
import * as PIXI from "pixi.js";
import GameQuote from "./GameQuote";
import Score from "./Score";

const KukkaDisplay = ({ score, user, clickKukka }) => {
  useEffect(() => {
    const scene = document.getElementById("kukka-scene");
    if (!scene) return;

    const WIDTH = scene.getBoundingClientRect().width;
    scene.style.height = `${WIDTH}px`;

    // The application will create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container.
    const app = new PIXI.Application({ view: scene, width: WIDTH, height: WIDTH, backgroundColor: 0xFFFFFF, resolution: window.devicePixelRatio || 1,});

    // create a new Sprite from an image path
    const bunny = PIXI.Sprite.from("/assets/kukka.png");

    // center the sprite's anchor point
    bunny.anchor.set(0.5);

    // move the sprite to the center of the screen
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;
    bunny.scale.x = 0.5;
    bunny.scale.y = 0.5;

    app.stage.addChild(bunny);

    // Listen for animate update
    app.ticker.add((delta) => {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
      bunny.rotation += 0.01 * delta;
    });

    return () => {
      app.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <canvas id="kukka-scene" className="w-full"/>

      <div className="absolute top-0 flex flex-col py-12 px-8 items-center z-10">  
        <h1>Kukan kasvatus peli</h1>
        <p>{ user ? `Kirjautunut pelaaja: ${user.username}` : null }</p>
        <h1>Kukkasi on <Score value={ score } /> pitkä</h1>
        <GameQuote score={score} />
        <button 
          onClick={ clickKukka }
          className="bg-yellow-400 rounded-full p-4">
            Rakasta kukkaasi
        </button>
      </div>
    </div>
  );
};

export default KukkaDisplay;