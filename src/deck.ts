import * as lodash from 'lodash';

export type COLOR = 'GREEN' | 'RED' | 'BLUE' | 'WHITE' | 'BLACK';
export type LAND_TYPE = 'FOREST' | 'MOUNTAIN' | 'ISLAND' | 'PLAIN' | 'SWAMP';

export interface Card {
  name: string;
  count: number;
}

export interface Land extends Card {
  name: string;
  type: LAND_TYPE[] | 'LAND';
  colors: COLOR[];
  count: number;
  condition?: LAND_TYPE[] | number;
}

export interface Cost {
  color: COLOR | 'GENERIC';
  amount: number;
}

export interface Spell extends Card {
  cost: Cost[];
}

export interface DeckList {
  cards: Card[];
}

export function getDeck(): Card[] {
  const deckTmpl = require('../deck.json');
  const deck: Card[] = [];
  for (const card of deckTmpl.cards) {
    for (let cardCount = 0; cardCount < card.count; cardCount++) {
      deck.push(card);
    }
  }
  return deck;
}

export class Deck {
  deck: Card[];

  constructor() {
    this.deck = getDeck();
  }

  shuffle(): void {
    this.deck = lodash.shuffle(this.deck);
  }

  drawCard(num: number): Card[] {
    const cards = [];

    for (let i = 0; i < num; i++) {
      const card = this.deck.shift();
      if (!card) throw new Error('deck out of cards');

      cards.push(card);
    }

    return cards;
  }
}
