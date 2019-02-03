import { Land, Spell, Card } from './deck';

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

function isLand(card: Card): card is Land {
  return (card as Land).type !== undefined;
}
