export function setupTicker(app, cards) {
  app.ticker.add(() => {
    cards.forEach((card) => {
      if (!card.data.isAnimating) return;

      card.x += (card.data.targetX - card.x) * 0.15;
      card.y += (card.data.targetY - card.y) * 0.15;

      card.rotation += 0.2;

      if (
        Math.abs(card.data.targetX - card.x) < 1 &&
        Math.abs(card.data.targetY - card.y) < 1
      ) {
        card.x = card.data.targetX;
        card.y = card.data.targetY;
        card.rotation = 0;
        card.data.isAnimating = false;
      }
    });
  });
}
