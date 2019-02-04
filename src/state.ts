import { Land, Card, COLOR } from './deck';
import * as utils from './utils';

export interface CardState {
  tap: boolean;
}

export type LandState = CardState & Land;

export class PlayerState {
  turn: number;
  life: number;
  lands: LandState[];
  hand: Card[];

  constructor() {
    this.turn = 0;
    this.life = 20;
    this.lands = [];
    this.hand = [];
  }

  /*
   * Order spells by priority
   *
   * Attempt to play lands in the following priority
   *
   * 1. Untapped source if a spell cost requires the color, in order of priority
   * 2. Tapped source of a color that enables high priority spell next turn
   * 3. Tapped source if no combination of spells require that amount
   * 4. Any untapped sources
   */
  playLand(): void {
    const lands = utils.getLands(this.hand);
    if (lands.length < 0) return;

    const colorSet = new Set<COLOR>();
    const colorReq = new Set<COLOR>();

    for (const land of this.lands) {
      for (const color of land.colors) {
        colorSet.add(color);
      }
    }

    const spells = utils.getSpells(this.hand);
    for (const spell of spells) {
      for (const cost of spell.costs) {
        if (cost.color !== 'GENERIC') colorReq.add(cost.color);
      }
    }

    const handLands = utils.getLands(this.hand);
    const untappedOncolorLand: Land[] = [];
    const tappedOncolorLand: Land[] = [];
    const untappedOffcolorLand: Land[] = [];
    const tappedOffcolorLand: Land[] = [];

    for (const land of handLands) {
      for (const color of land.colors) {
        if (!colorSet.has(color) && utils.playLandUntapped(land, this.lands)) untappedOncolorLand.push(land);
      }
    }
  }
}
