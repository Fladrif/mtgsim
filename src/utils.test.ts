import * as utils from './utils';
import { Spell } from './deck';

describe('utils', () => {
  it('getCMC', () => {
    const spell: Spell = {
      name: 'dummy',
      count: 29,
      costs: [
        {
          amount: 2,
          color: 'RED',
        },
        {
          amount: 3,
          color: 'GENERIC',
        },
      ],
    };

    expect(utils.getCMC(spell)).toEqual(5);
  });
});
