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
import { createTable } from "./pixi/Table";
import { useRouter } from "next/navigation";
import { createButton } from "../../pixi/Button";

let cardtype = ["♠️", "♣️", "♦️", "❤️"];
let cardnumber = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
function shuffleArray(arr, startpoint = 0) {
  for (let i = arr.length - 1; i > startpoint; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (arr[i]?.data?.cardtype && arr[j]?.data?.cardtype)
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
  return arr;
}

export default function GameCanvas() {
  const containerRef = useRef(null);
  const appRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    console.log("ok");
    let isMounted = true;
    let activeCard = null;

    const init = async () => {
      if (!isMounted) return;

      const app = new Application();
      await app.init({
        resizeTo: containerRef.current,
        backgroundColor: "#123",
      });

      appRef.current = app;
      await createTable(app, 0);

      createButton(
        app,
        () => {
          console.log("const");
          router.push("/");
        },
        "Home",
      );

      const topContainer = new Container();

      const createBlock = (x = 0, y = 0, icon) => {
        const block1 = new Graphics()
          .roundRect(x, y, 100, 130, 10)

          .fill("#00ff0033")
          .stroke({ width: 3, color: "#ffff90" });

        const text = new Text({
          text: icon,
          style: { fontSize: 45, fill: "black", align: "center" },
        });
        text.anchor.set(0.5);
        text.x = block1.width / 2;
        text.y = block1.height / 2;
        block1.addChild(text);
        return block1;
      };

      const createBlockContainer = (iconindex = "") => {
        const block1Container = new Container();
        app.stage.addChild(block1Container);
        const block1 = createBlock(0, 0, cardtype[iconindex]);
        block1Container.eventMode = "static";
        block1Container.on("pointerdown", () => {
          if (activeCard?.children[0]) {
            console.log(activeCard, "activeCard");
            if (activeCard.data.cardtype !== iconindex) {
              alert(`"Expected type", ${cardtype[iconindex]}`);
              return;
            } else if (
              activeCard.data.numindex !==
              block1Container.children?.length - 1
            ) {
              console.log(
                activeCard.data.numindex,
                block1Container.children?.length,
              );

              alert(
                `"Expected card", ${cardnumber[block1Container.children?.length - 1]}`,
              );
              return;
            }
            activeCard.targetfound = true;
            activeCard.y = (block1Container.children.length - 1) * 30;
            if (activeCard.children[0]) activeCard.children[0].clear();
            activeCard.children[0]
              .roundRect(0, 0, 100, 130, 10)
              .fill("white")
              .stroke({ width: 1, color: "black" });
            block1Container.addChild(activeCard);
            activeCard = null;
            if (decTargetContainer.children.length)
              activeCard =
                decTargetContainer.children.length - 1 > 0
                  ? decTargetContainer.children[
                      decTargetContainer.children.length - 1
                    ]
                  : null;
          }
        });
        block1Container.addChild(block1);
        block1Container.x = topContainer.children.length * 110;
        block1Container.y = 0;

        topContainer.addChild(block1Container);
      };
      createBlockContainer(0);
      createBlockContainer(1);
      createBlockContainer(2);
      createBlockContainer(3);

      topContainer.x = app.screen.width - topContainer.width - 10;
      topContainer.y = 30;
      app.stage.addChild(topContainer);

      const decContainer = new Container();

      const decblock = createBlock(0);
      decblock.eventMode = "static";

      decblock.on("pointerdown", () => {
        if (decContainer.children.length === 1) {
          for (let i = decTargetContainer.children.length - 1; i >= 1; i--) {
            decContainer.addChild(decTargetContainer.children[i]);
          }
        }
      });
      decContainer.addChild(decblock);
      decContainer.x = 10;
      decContainer.y = 30;
      app.stage.addChild(decContainer);

      const decTargetContainer = new Container();

      const decTargetblock = createBlock(0);
      decTargetContainer.addChild(decTargetblock);
      decTargetContainer.x = decContainer.width + 20;
      decTargetContainer.y = 30;
      app.stage.addChild(decTargetContainer);

      for (let cardtypeindex = 0; cardtypeindex < 4; cardtypeindex++) {
        for (let i = 0; i < 13; i++) {
          const cardWrapper = new Container();
          const card = new Graphics()
            .roundRect(0, 0, 100, 130, 10)
            .fill("white")
            .stroke({ width: 1, color: "#123" });

          const num = i; //Math.floor(Math.random() * 13);
          const typeIndex = cardtypeindex; //Math.floor(Math.random() * 4);
          const text = new Text({
            text: `${cardnumber[num]} ${cardtype[typeIndex]}`,
            style: { fontSize: 22, fill: "black", align: "center" },
          });

          const textIcon = new Text({
            text: `${cardtype[typeIndex]}`,
            style: { fontSize: 35, fill: "black", align: "center" },
          });
          text.anchor.set(0.5);
          text.x = 35;
          text.y = 20;

          cardWrapper.addChild(card);
          cardWrapper.addChild(text);

          textIcon.anchor.set(0.5);
          textIcon.x = cardWrapper.width / 2;
          textIcon.y = cardWrapper.height / 2;
          cardWrapper.addChild(textIcon);

          cardWrapper.eventMode = "static";
          cardWrapper.cursor = "pointer";

          cardWrapper.data = {
            cardtype: typeIndex,
            numindex: num,
          };

          decContainer.addChild(cardWrapper);
          cardWrapper.on("pointerdown", () => {
            if (cardWrapper.targetfound) return;

            card.clear();
            card
              .roundRect(0, 0, 100, 130, 10)
              .fill("white")
              .stroke({ width: 1, color: "red" });

            decTargetContainer.addChild(cardWrapper);
            console.log("active");
            activeCard = cardWrapper;
          });
        }
      }
      console.log(decContainer.children, "decContainer.children");
      shuffleArray(decContainer.children, 2);

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
