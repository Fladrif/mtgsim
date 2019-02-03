import { Deck } from './deck';

function main(): void {
  const deck = new Deck();
  deck.shuffle();
  console.log(deck.drawCard(7).map(card => card.name));
}

main();
