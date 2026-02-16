"use client";

import { useEffect, useRef } from "react";
import {
  Application,
  Assets,
  Container,
  Graphics,
  Sprite,
  Text,
} from "pixi.js";

let cardtype = ["♠️", "♣️", "♦️", "❤️"];
let cardnumber = [
  "A", "2", "3", "4", "5", "6",
  "7", "8", "9", "10", "J", "Q", "K",
];

export default function GameCanvas() {
  const containerRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    let activeCard = null;

    const initPixi = async () => {
      if (!isMounted) return;

      const app = new Application();
      await app.init({
        resizeTo: containerRef.current,
        backgroundColor: "#123",
      });

      appRef.current = app;

      // -------- TABLE BG ----------
      const tabletexture = await Assets.load("/images/tableBg.jpg");
      const tableSprite = new Sprite(tabletexture);
      tableSprite.width = app.screen.width;
      tableSprite.height = app.screen.height;
      app.stage.addChild(tableSprite);

      // -------- CENTER TABLE ----------
      const tableCenter = new Graphics()
        .roundRect(
          app.screen.width / 2 - 250,
          app.screen.height / 2 - 130,
          500,
          300,
          100
        )
        .fill("#510a0a");

      app.stage.addChild(tableCenter);

      // -------- CARD CONTAINER ----------
      const cardContainer = new Container();
      app.stage.addChild(cardContainer);


      

const wrapper = new Container();


      const profile = await Assets.load('/images/placeholder/profile.png');
      const profileTexture = new Sprite(profile);
      
      profileTexture.width = 80;
      profileTexture.height = 80;
          const border = new Graphics();
    border
    .circle(profileTexture.width/2 , profileTexture.width/2 -2, profileTexture.width/2)
    .fill( 'silver' ).stroke({ width: 4, color: 'maroon' });//.stroke(4, 'red');
    
      wrapper.x =  120;
      wrapper.y = app.screen.height - 120;
    
      wrapper.addChild(border);
wrapper.addChild(profileTexture);
      app.stage.addChild(wrapper);

      for (let i = 0; i < 13; i++) {
        const cardWrapper = new Container();
        cardWrapper.x = 60 * i;
        cardWrapper.y = 0;

        const card = new Graphics()
          .roundRect(0, 0, 50, 70, 5)
          .fill("white");

        const num = Math.floor(Math.random() * 13);
        const typeIndex = Math.floor(Math.random() * 4);

        const basicText = new Text({
          text: `${cardnumber[num]}\n${cardtype[typeIndex]}`,
          style: {
            fontFamily: "Arial",
            fontSize: 14,
            fill: "black",
            align: "center",
          },
        });

        basicText.anchor.set(0.5);
        basicText.x = 25;
        basicText.y = 35;

        cardWrapper.addChild(card);
        cardWrapper.addChild(basicText);

        cardWrapper.eventMode = "static";
        cardWrapper.cursor = "pointer";

        // Store original position
        cardWrapper.data = {
          originalX: cardWrapper.x,
          originalY: cardWrapper.y,
          targetX: cardWrapper.x,
          targetY: cardWrapper.y,
          isAnimating: false,
        };

        cardWrapper.on("pointerdown", (event) => {
          const clickedCard = event.currentTarget;

          // If another card is active, return it
          if (activeCard && activeCard !== clickedCard) {
            activeCard.data.targetX = activeCard.data.originalX;
            activeCard.data.targetY = activeCard.data.originalY;
            activeCard.data.isAnimating = true;
          }

          // Toggle clicked card
          if (clickedCard === activeCard) {
            // Send back to original
            clickedCard.data.targetX = clickedCard.data.originalX;
            clickedCard.data.targetY = clickedCard.data.originalY;
            activeCard = null;
          } else {
            // Move to center
            clickedCard.data.targetX =
              app.screen.width / 2 - cardContainer.x - 25;
            clickedCard.data.targetY =
              app.screen.height / 2 - cardContainer.y - 35;
            activeCard = clickedCard;
          }

          clickedCard.data.isAnimating = true;
        });

        cardContainer.addChild(cardWrapper);
      }

      // Position card row
      cardContainer.y = app.screen.height - 120;
      cardContainer.x =
        app.screen.width / 2 - cardContainer.width / 2;

      // -------- GLOBAL TICKER ----------
      app.ticker.add(() => {
        cardContainer.children.forEach((card) => {
          if (!card.data.isAnimating) return;

          card.x += (card.data.targetX - card.x) * 0.15;
          card.y += (card.data.targetY - card.y) * 0.15;

          if (
            Math.abs(card.data.targetX - card.x) < 1 &&
            Math.abs(card.data.targetY - card.y) < 1
          ) {
            card.x = card.data.targetX;
            card.y = card.data.targetY;
            card.data.isAnimating = false;
          }
        });
      });

      containerRef.current.appendChild(app.canvas);
    };

    initPixi();

    return () => {
      isMounted = false;
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "98vw",
        height: "98vh",
        margin: "auto",
      }}
    />
  );
}
