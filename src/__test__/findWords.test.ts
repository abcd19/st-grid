import {calcRank} from '../findWords';

describe('findWords', () => {

  test('find word', () => {
    expect(calcRank(['orange','apple','banana'], 'or', undefined)).toStrictEqual(
      [
        { rank: 3, elemLink: 0 },
        { rank: 0, elemLink: 1 },
        { rank: 0, elemLink: 2 }
      ]
    );
  })

})