import React, { useEffect } from "react";
import * as PIXI from "pixi.js";
import GameQuote from "./GameQuote";
import Score from "./Score";

let mem = null;

const KukkaDisplay = ({ score, user, userLevel, clickKukka }) => {
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
    const AMOUNT = 500;
    for (let i = 0; i < AMOUNT; ++i) {
      const container = new PIXI.Container();
      container.x = app.screen.width / 2;
      container.y = app.screen.height / 2;
      container.speed = Math.random() * 2 - 1;
      const leaf = new PIXI.Sprite(textures[i % 3]);
      leaf.container = container;
      leaf.anchor.set(0.5);
      container.pivot.x = Math.random() * app.screen.width / 3;
      container.pivot.y = Math.random() * app.screen.height / 3;
      // leaf.x = Math.random() * app.screen.width;
      // leaf.y = Math.random() * app.screen.height;
      const scale = Math.max(Math.random() / 2.5, 0.25);
      leaf.scale.x = scale;
      leaf.scale.y = scale;
      leaf.speed = Math.random() * 2 - 1;
      leaves.push(leaf);
      container.addChild(leaf);
      app.stage.addChild(container);
      leaf.visible = false;
    }

    // leaves
    const arrows = [];
    const arrowTexture = PIXI.Texture.from("/assets/arrow.png");
    const ARROW_AMOUNT = userLevel;
    for (let i = 0; i < ARROW_AMOUNT; ++i) {
      const arrow = new PIXI.Sprite(arrowTexture);
      arrow.anchor.set(0.5);
      arrow.x = Math.random() * app.screen.width;
      arrow.y = Math.random() * app.screen.height;
      // leaf.x = Math.random() * app.screen.width;
      // leaf.y = Math.random() * app.screen.height;
      arrow.rotation = Math.PI / 2;
      const scale = Math.max(Math.random(), 0.3);
      arrow.scale.x = scale;
      arrow.scale.y = scale;
      arrow.zIndex = Math.floor(scale * 1000);
      arrow.speed = scale * 5;
      arrows.push(arrow);
      app.stage.addChild(arrow);
    }

    // create a new Sprite from an image path
    const bunny = PIXI.Sprite.from("/assets/kukka.png");

    // center the sprite's anchor point
    bunny.anchor.set(0.5);

    // move the sprite to the center of the screen
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;

    bunny.interactive = true;
    bunny.on("pointerdown", () => {
      bunny.rotation -= 0.03;
      bunny.clicktime = Date.now();
    });

    app.stage.addChild(bunny);

    // Listen for animate update
    app.ticker.add((delta) => {
      const score = app.score;
      const x = Math.log(score) / 1000;
      const visibleLeaves =  Math.min(x * 1000, AMOUNT); // Math.floor(1000 * x);
      leaves.forEach((leaf, i) => {
        if (i + 1 < visibleLeaves) {
          leaf.rotation += leaf.speed * 0.1 * delta;
          leaf.container.rotation += leaf.container.speed * 0.01 * delta;
          leaf.visible = true;
        } else {
          leaf.visible = false;
        }
      });
      arrows.forEach((arrow) => {
        arrow.y -= arrow.speed * 0.1 * delta;
        if (arrow.y < -50) {
          arrow.y = app.screen.height + 50;
        }
      });
      const scale = Math.max(0.15, Math.min(x * 0.5, 0.5));
      bunny.scale.x = scale;
      bunny.scale.y = scale;
      if (!bunny.clicktime || Date.now() - bunny.clicktime > 200) {
        bunny.rotation += 0.01 * delta;
      }
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
  }, [userLevel]);

  useEffect(()=> {
    if (mem) {
      mem.score = score;
    }
  }, [score]);

  const logout = () => {
    if (window.confirm("Haluatko kirjautua ulos?")) {
      window.localStorage.clear();
      window.location.reload(true);
    }
  };

  return (
    <div className="w-full relative cursor-pointer">
      <canvas id="kukka-scene" className="w-full" onPointerDown={ clickKukka } />

      <div className="absolute top-0 left-0 z-10 w-full h-full pointer-events-none">
        <div className="flex flex-col md:flex-row w-full justify-between md:items-center p-2 md:p-4">
          <h1 className="md:text-xl font-bold">Kukan kasvatus peli</h1>
          <p className="md:text-xl font-bold">
            { user ? `Kirjautunut pelaaja: ${user.username}` : null }
            <a className="pointer-events-auto" href="#" onClick={() => logout()}> (kirjaudu ulos)</a>
          </p>
        </div>

        <div
          style={{ background: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)" }}
          className="absolute bottom-0 left-0 flex flex-col items-center p-4 w-full"
        >
          <h1 className="font-extrabold">Kukkasi on</h1>
          <h1 className="font-extrabold text-2xl"><Score value={ score } /></h1>
          <h1 className="font-extrabold">pitkä</h1>
          <GameQuote score={score} />
        </div>
      </div>
    </div>
  );
};

export default KukkaDisplay;
