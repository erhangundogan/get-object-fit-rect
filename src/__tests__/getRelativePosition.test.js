const { getRelativePosition } = require('../getRelativePosition');

describe('getRelativePosition', () => {
  const objectFitRect = {
    bottom: 112,
    height: 160,
    left: 0,
    right: 0,
    top: 112,
    width: 480
  };

  test('returns relative position when the point is inside the rect', () => {
    const position = {
      x: 45,
      y: 150
    };
    expect(getRelativePosition(position, objectFitRect)).toEqual({ x: '9.375%', y: '23.75%' });
  });
  test('returns undefined when the point is out of the rect', () => {
    const position = {
      x: 105,
      y: 100
    };
    expect(getRelativePosition(position, objectFitRect)).toEqual(undefined);
  });
});
