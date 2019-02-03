import { Deck, Land } from './deck';

export interface GameState {
  turn: number;
  life: number;
  lands: Land[];
}

function main(): void {
  const deck = new Deck();
  deck.shuffle();
  console.log(deck.drawCard(7).map(card => card.name));
}

main();
