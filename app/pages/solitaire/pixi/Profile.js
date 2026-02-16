import { Assets, Container, Graphics, Sprite } from "pixi.js";

export async function createProfile(app) {
  const wrapper = new Container();

  const texture = await Assets.load("/images/placeholder/profile.png");
  const sprite = new Sprite(texture);

  sprite.width = 80;
  sprite.height = 80;

  const background = new Graphics().circle(40, 40, 40).fill("silver");

  const border = new Graphics()
    .circle(40, 40, 40)
    .fill("silver")
    .stroke({ width: 4, color: "maroon" });

  wrapper.addChild(background);
  wrapper.addChild(border);
  wrapper.addChild(sprite);

  wrapper.x = 120;
  wrapper.y = app.screen.height - 120;

  // -------- TIMER LOGIC ----------
  let duration = 5; // 5 seconds
  let elapsed = 0;

  app.ticker.add((ticker) => {
    if (elapsed >= duration) return;

    // Proper delta time calculation
    elapsed += ticker.deltaMS / 1000;

    const remaining = Math.max(0, duration - elapsed);
    const progress = remaining / duration;

    // Redraw arc
    border.clear();
    border.arc(
      wrapper.width / 2,
      wrapper.height / 2,
      42,
      -Math.PI / 2,
      -Math.PI / 2 + progress * Math.PI * 2,
    );
    border.stroke({
      width: 4,
      color: 0xff0000,
    });
  });
  app.stage.addChild(wrapper);
}
