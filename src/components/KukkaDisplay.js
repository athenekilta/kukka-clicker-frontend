import React, { useEffect } from "react";
import * as PIXI from "pixi.js";
import GameQuote from "./GameQuote";
import Score from "./Score";

let mem = null;

const KukkaDisplay = ({ score, user, clickKukka }) => {
  const createScene = () => {
    const scene = document.getElementById("kukka-scene");
    if (!scene) return;

    const WIDTH = scene.getBoundingClientRect().width;
    scene.style.height = `${WIDTH}px`;

    // The application will create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container.
    const app = new PIXI.Application({ view: scene, width: WIDTH, height: WIDTH, backgroundColor: 0xFFFFFF, resolution: window.devicePixelRatio || 1,});

    const textures = ["/assets/lehti1.png", "/assets/lehti2.png", "/assets/lehti3.png"].map((url) => PIXI.Texture.from(url));
    // leaves
    const leaves = [];
    const AMOUNT = 100;
    for (let i = 0; i < AMOUNT; ++i) {
      const container = new PIXI.Container();
      container.x = app.screen.width / 2;
      container.y = app.screen.height / 2;
      container.speed = Math.random() * 2 - 1;
      const leaf = new PIXI.Sprite(textures[i % 3]);
      leaf.container = container;
      leaf.anchor.set(0.5);
      container.pivot.x = Math.random() * app.screen.width / 1.6;
      container.pivot.y = Math.random() * app.screen.height / 1.6;
      // leaf.x = Math.random() * app.screen.width;
      // leaf.y = Math.random() * app.screen.height;
      const scale = Math.max(Math.random() / 4, 0.1);
      leaf.scale.x = scale;
      leaf.scale.y = scale;
      leaf.speed = Math.random() * 2 - 1;
      leaves.push(leaf);
      container.addChild(leaf);
      app.stage.addChild(container);
      leaf.visible = false;
    }

    // create a new Sprite from an image path
    const bunny = PIXI.Sprite.from("/assets/kukka.png");

    // center the sprite's anchor point
    bunny.anchor.set(0.5);

    // move the sprite to the center of the screen
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;

    app.stage.addChild(bunny);

    // Listen for animate update
    app.ticker.add((delta) => {
      const score = app.score;
      const x = Math.log(score) / 1000;
      const visibleLeaves =  Math.min(x * 1000, 1000); // Math.floor(1000 * x);
      leaves.forEach((leaf, i) => {
        if (i + 1 < visibleLeaves) {
          leaf.rotation += leaf.speed * 0.1 * delta;
          leaf.container.rotation += leaf.container.speed * 0.01 * delta;
          leaf.visible = true;
        } else {
          leaf.visible = false;
        }
      });
      const scale = Math.max(0.15, Math.min(x * 0.5, 0.5));
      bunny.scale.x = scale;
      bunny.scale.y = scale;
      bunny.rotation += 0.01 * delta;
    });

    return app;
  };

  // hacky way to update score to pixi app
  useEffect(() => {
    const app = createScene();
    if (app) {
      mem = app;
    }
    return () => {
      if (app) {
        app.destroy();
        mem = null;
      }
    };
  }, []);

  useEffect(()=> {
    if (mem) {
      mem.score = score;
    }
  }, [score]);

  return (
    <div className="w-full h-full relative">
      <canvas id="kukka-scene" className="w-full"/>

      <div className="absolute top-0 left-0 z-10 w-full h-full">
        <div className="flex w-full justify-between items-center p-2 md:p-4">
          <h1 className="text-xl font-bold">Kukan kasvatus peli</h1>
          <p className="text-xl font-bold">{ user ? `Kirjautunut pelaaja: ${user.username}` : null }</p>
        </div>

        <div 
          style={{ left: "50%", top: "50%", transform: "translateX(-50%) translateY(-50%)"}}
          className="absolute top-0 left-0 flex flex-col items-center bg-white p-4 bg-opacity-60 rounded-lg"
        >
          <h1 className="font-extrabold">Kukkasi on</h1>
          <h1 className="font-extrabold text-2xl"><Score value={ score } /></h1>
          <h1 className="font-extrabold">pitkä</h1>
          <GameQuote score={score} />
          <button 
            onClick={ clickKukka }
            className="bg-yellow-400 rounded-full p-4">
            Rakasta kukkaasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default KukkaDisplay;