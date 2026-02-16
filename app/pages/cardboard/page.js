"use client";

import { useEffect, useRef } from "react";
import { Application, Assets, Container, Graphics, Sprite } from "pixi.js";
import { createTable } from "./pixi/Table";
import { createProfile } from "./pixi/Profile";
import { createCardRow } from "./pixi/Cards";
import { setupTicker } from "./pixi/Ticker";
import { createCardDec } from "./pixi/CardDec";
import { useRouter } from "next/navigation";
import { createButton } from "../../pixi/Button";

export default function GameCanvas() {
  const containerRef = useRef(null);
  const appRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (!isMounted) return;

      const app = new Application();
      await app.init({
        resizeTo: containerRef.current,
        backgroundColor: "#123",
      });

      appRef.current = app;
      // Create modules
      await createTable(app);
      await createProfile(app);
      createButton(
        app,
        () => {
          console.log("const");
          router.push("/");
        },
        "Home",
      );

      const cardContainer = new Container();
      app.stage.addChild(cardContainer);
      const cards = createCardRow(app, cardContainer);
      const cardDecContainer = new Container();
      app.stage.addChild(cardDecContainer);
      const cardDec = createCardDec(app, cardContainer, cardDecContainer);
      setupTicker(app, cardDec);
      setupTicker(app, cards);
      containerRef.current.appendChild(app.canvas);
    };

    init();

    return () => {
      isMounted = false;
      appRef.current?.destroy(true);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "98vw", height: "98vh", margin: "auto" }}
    />
  );
}
