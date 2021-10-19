import React, { useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import GameQuote from "./GameQuote";
import Score from "./Score";
import Header from "./Header";

const KukkaDisplay = ({ score, user, userLevel, clickKukka }) => {
  const [pixiApp, setPixiApp] = useState(null);

  const createScene = () => {
    const scene = document.getElementById("kukka-scene");
    if (!scene) return;

    const WIDTH = scene.getBoundingClientRect().width;
    scene.style.height = `${WIDTH}px`;

    // The application will create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container.
    const app = new PIXI.Application({ view: scene, width: WIDTH, height: WIDTH, backgroundColor: 0xFFFFFF, resolution: window.devicePixelRatio || 1,});
    app.score = score;
    app.userLevel = userLevel;

    const textures = ["/assets/lehti1.png", "/assets/lehti2.png", "/assets/lehti3.png"].map((url) => PIXI.Texture.from(url));
    // leaves
    const leaves = [];
    const MAX_AMOUNT = 500;
    for (let i = 0; i < MAX_AMOUNT; ++i) {
      const container = new PIXI.Container();
      container.x = app.screen.width / 2;
      container.y = app.screen.height / 2;
      container.speed = Math.random() * 2 - 1;
      const leaf = new PIXI.Sprite(textures[i % 3]);
      leaf.container = container;
      leaf.anchor.set(0.5);
      container.pivot.x = (Math.random() * 2 - 1) * app.screen.width / 2;
      container.pivot.y = (Math.random() * 2 - 1) * app.screen.height / 2;
      // leaf.x = Math.random() * app.screen.width;
      // leaf.y = Math.random() * app.screen.height;
      const scale = Math.max(Math.random(), 0.25);
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

    const createArrow = () => {
      const arrow = new PIXI.Sprite(arrowTexture);
      arrow.anchor.set(0.5);
      arrow.rotation = Math.PI / 2;
      arrow.x = Math.random() * app.screen.width;
      arrow.y = Math.random() * app.screen.height;
      const scale = Math.max(Math.random() * 0.75, 0.3);
      arrow.scale.x = scale;
      arrow.scale.y = scale;
      arrow.speed = scale * 10;
      arrows.push(arrow);
      app.stage.addChild(arrow);
    };

    const ARROW_AMOUNT = app.userLevel;
    for (let i = 0; i < ARROW_AMOUNT; ++i) {
      createArrow();
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

      // leaves
      const visibleLeaves = Math.min(x * 1000, MAX_AMOUNT); // Math.floor(1000 * x);
      leaves.forEach((leaf, i) => {
        if (i + 1 < visibleLeaves) {
          leaf.rotation += leaf.speed * 0.1 * delta;
          leaf.container.rotation += leaf.container.speed * 0.01 * delta;
          leaf.visible = true;
        } else {
          leaf.visible = false;
        }
      });

      // create arrows if too little
      if (arrows.length < app.userLevel) {
        const amount = app.userLevel - arrows.length;
        for (let i = 0; i < amount; ++i) {
          createArrow();
        }
      }

      // awwors
      arrows.forEach((arrow) => {
        arrow.y -= arrow.speed * 0.1 * delta;
        if (arrow.y < -50) {
          arrow.y = app.screen.height + 50;
        }
      });

      // bunny aka flower
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
      setPixiApp(app);
    }
    return () => {
      if (app) {
        app.destroy();
        setPixiApp(null);
      }
    };
  }, []);

  useEffect(()=> {
    if (pixiApp) {
      pixiApp.userLevel = userLevel;
    }
  }, [userLevel]);

  useEffect(()=> {
    if (pixiApp) {
      pixiApp.score = score;
    }
  }, [score]);

  return (
    <div className="w-full relative cursor-pointer">
      <canvas id="kukka-scene" className="w-full" onPointerDown={ clickKukka } />
      <div
        className="absolute top-0 left-0 z-10 w-full h-full pointer-events-none"
      >
        <Header user={user} />
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
