import { Container, Graphics, Text } from "pixi.js";

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

export function createCard(app, x) {
  const cardWrapper = new Container();

  const card = new Graphics().roundRect(0, 0, 50, 70, 5).fill("white");

  const num = Math.floor(Math.random() * 13);
  const typeIndex = Math.floor(Math.random() * 4);

  const text = new Text({
    text: `${cardnumber[num]}\n${cardtype[typeIndex]}`,
    style: { fontSize: 14, fill: "black", align: "center" },
  });

  text.anchor.set(0.5);
  text.x = 25;
  text.y = 35;

  cardWrapper.addChild(card);
  cardWrapper.addChild(text);

  cardWrapper.data = {
    defaultX: app.screen.width / 2,
    defaultY: app.screen.height / 2,
    originalX: x,
    originalY: 0,
    targetX: x,
    targetY: 0,
    isAnimating: false,
  };

  cardWrapper.eventMode = "static";
  cardWrapper.cursor = "pointer";

  return cardWrapper;
}
