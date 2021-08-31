const { getRelativePosition } = require('../getRelativePosition');

describe('getRelativePosition', () => {
  const intrinsicSize = { width: 320, height: 480 };
  const renderedSize = { width: 250, height: 200 };

  describe('object-fit: cover', () => {
    test('returns relative position when the point is inside the rect', () => {
      const position = {
        x: 230,
        y: 152
      };
      expect(getRelativePosition({ position, intrinsicSize, renderedSize })).toEqual({
        x: '71.875%',
        y: '15.625%'
      });
    });
    test('returns undefined when the point is out of the rect', () => {
      const position = {
        x: 200,
        y: 80
      };
      expect(getRelativePosition({ position, intrinsicSize, renderedSize })).toEqual(undefined);
    });
  });

  describe('object-fit: contain', () => {
    const position = {
      x: 232,
      y: 150
    };
    test('returns relative position by percent', () => {
      expect(
        getRelativePosition({ position, intrinsicSize, renderedSize, objectFitType: 'contain' })
      ).toEqual({
        x: '62%',
        y: '31.25%'
      });
    });
    test('returns relative position by pixel', () => {
      expect(
        getRelativePosition({
          position,
          intrinsicSize,
          renderedSize,
          objectFitType: 'contain',
          percentResult: false
        })
      ).toEqual({
        x: 155,
        y: 62.5
      });
    });
  });

  describe('object-fit: fill', () => {
    const position = {
      x: 232,
      y: 150
    };
    test('returns relative position by percent', () => {
      expect(getRelativePosition({ position, intrinsicSize, renderedSize, objectFitType: 'fill' })).toEqual({
        x: '72.5%',
        y: '31.25%'
      });
    });
    test('returns relative position by pixel', () => {
      expect(
        getRelativePosition({
          position,
          intrinsicSize,
          renderedSize,
          objectFitType: 'fill',
          percentResult: false
        })
      ).toEqual({
        x: 181.25,
        y: 62.5
      });
    });
  });
});
