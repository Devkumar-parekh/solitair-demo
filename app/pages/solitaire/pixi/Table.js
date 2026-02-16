import { Assets, Graphics, Sprite } from "pixi.js";

export async function createTable(app, center = 1) {
  const texture = await Assets.load("/images/tableBg.jpg");
  const bg = new Sprite(texture);

  bg.width = app.screen.width;
  bg.height = app.screen.height;
  app.stage.addChild(bg);
  if (center) {
    const tableCenter = new Graphics()
      .roundRect(
        app.screen.width / 2 - 250,
        app.screen.height / 2 - 130,
        500,
        250,
        100,
      )
      .fill("#510a0a")
      .stroke({ width: 20, color: "#123" });

    app.stage.addChild(tableCenter);
  }
}
