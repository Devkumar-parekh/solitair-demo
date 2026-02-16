import { Container, Graphics, Text } from "pixi.js";
import { createCard } from "./Card";

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

export function createCardRow(app, cardContainer) {
  let activeCard = null;
  const cards = [];

  let flag = 0;

  for (let i = 0; i < 13; i++) {
    const cardWrapper = createCard(app, i); //new Container();
    cardWrapper.on("pointerdown", () => {
      if (activeCard && activeCard !== cardWrapper) {
        activeCard.data.targetX = activeCard.data.originalX;
        activeCard.data.targetY = activeCard.data.originalY;
        activeCard.data.isAnimating = true;
      }

      if (activeCard === cardWrapper) {
        cardWrapper.data.targetX = cardWrapper.data.originalX;
        cardWrapper.data.targetY = cardWrapper.data.originalY;
        activeCard = null;
      } else {
        cardWrapper.data.targetX = app.screen.width / 2 - cardContainer.x - 25;
        cardWrapper.data.targetY = app.screen.height / 2 - cardContainer.y - 35;
        activeCard = cardWrapper;
      }

      if (i == 12) cardContainer.x = app.screen.width / 2 - (i * 60) / 2;
      // app.screen.width / 2 - cardContainer.width / 2;
      cardWrapper.data.isAnimating = true;
    });

    // cardContainer.addChild(cardWrapper);
    cards.push(cardWrapper);
  }

  cardContainer.y = app.screen.height - 120;
  cardContainer.x = app.screen.width / 2 - cardContainer.width / 2;

  return cards;
}
