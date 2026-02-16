import { Container, Graphics, Text } from "pixi.js";

export function createButton(app, handleclick, label) {
  const buttonWrapper = new Container();
  buttonWrapper.x = 20;
  buttonWrapper.y = app.screen.height - 100;

  const mytext = new Text({
    text: label,
    style: { fontSize: 14, fill: "white", align: "center" },
  });

  mytext.anchor.set(0.5);
  mytext.x = 50;
  mytext.y = 15;

  //   buttonWrapper.addChild(text);
  const button1 = new Graphics()
    .roundRect(0, 0, 100, 30, 10)
    .fill("#123")
    .stroke({ width: 3, color: "white" });
  // Opt-in to interactivity
  button1.eventMode = "static";

  // Shows hand cursor
  button1.cursor = "pointer";
  button1.on("pointerdown", handleclick);
  buttonWrapper.addChild(button1);
  buttonWrapper.addChild(mytext);
  app.stage.addChild(buttonWrapper);
}
