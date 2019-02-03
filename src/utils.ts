import { Land, Spell, Card } from './deck';

function isLand(card: Card): card is Land {
  return (card as Land).type !== undefined;
}

export function getLands(cards: Card[]): Land[] {
  const lands = [];

  for (const card of cards) {
    if (isLand(card)) lands.push(card);
  }

  return lands;
}

export function getCMC(spell: Spell): number {
  return spell.costs.reduce((total, idx) => idx.amount + total, 0);
}

export function playLandUntapped(landInHand: Land, landsInPlay: Land[]): boolean {
  if (!landInHand.condition) return true;
  if (typeof landInHand.condition === 'number') return true;

  const landTypeSet = new Set();

  for (const land of landsInPlay) {
    for (const landType of land.type) {
      landTypeSet.add(landType);
    }
  }

  for (const cond of landInHand.condition) {
    if (landTypeSet.has(cond)) return true;
  }
  return false;
}
