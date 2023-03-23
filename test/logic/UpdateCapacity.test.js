const { getRandomNumber} = require('../../logic/UpdateCapacity');

describe('getRandomNumber', () => {
  test('should return a number between min and max (inclusive)', () => {
    const min = 5;
    const max = 10;
    const randomNumber = getRandomNumber(min, max);
    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });
});