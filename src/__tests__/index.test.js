const { getObjectFitRect } = require('../');

describe('getObjectFitRect', () => {
  describe('default alignment', () => {
    test('calculates image with exact size', () => {
      const intrinsicSize = { width: 100, height: 100 };
      const renderedSize = { width: 50, height: 50 };
      const { absolute, relative } = getObjectFitRect({ intrinsicSize, renderedSize });
      expect(absolute).toEqual({ top: 0, left: 0, bottom: 0, right: 0 });
      expect(relative).toEqual({ top: '0px', left: '0px', height: '100%', width: '100%' });
    });
    test('calculates image having less width', () => {
      const intrinsicSize = { width: 100, height: 100 };
      const renderedSize = { width: 30, height: 100 };
      const { absolute, relative } = getObjectFitRect({ intrinsicSize, renderedSize });
      expect(absolute).toEqual({ top: 0, left: 35, bottom: 0, right: 35 });
      expect(relative).toEqual({ top: '0px', left: '35%', height: '100%', width: '30%' });
    });
    test('calculates image having less height', () => {
      const intrinsicSize = { width: 100, height: 100 };
      const renderedSize = { width: 50, height: 20 };
      const { absolute, relative } = getObjectFitRect({ intrinsicSize, renderedSize });
      expect(absolute).toEqual({ top: 30, left: 0, bottom: 30, right: 0 });
      expect(relative).toEqual({ top: '30%', left: '0px', height: '40%', width: '100%' });
    });
  });
  describe('custom alignment', () => {
    test('calculates image having less width', () => {
      const intrinsicSize = { width: 100, height: 100 };
      const renderedSize = { width: 30, height: 100 };
      const alignment = { horizontal: 0.15, vertical: 0.75 };
      const { absolute, relative } = getObjectFitRect({ intrinsicSize, renderedSize, alignment });
      expect(absolute).toEqual({ top: 0, left: 10.5, bottom: 0, right: 59.5 });
      expect(relative).toEqual({ top: '0px', left: '10.5%', height: '100%', width: '30%' });
    });
    test('calculates image having less height', () => {
      const intrinsicSize = { width: 100, height: 100 };
      const renderedSize = { width: 50, height: 20 };
      const alignment = { horizontal: 0.25, vertical: 0.8 };
      const { absolute, relative } = getObjectFitRect({ intrinsicSize, renderedSize, alignment });
      expect(absolute).toEqual({ top: 48, left: 0, bottom: 12, right: 0 });
      expect(relative).toEqual({ top: '48%', left: '0px', height: '40%', width: '100%' });
    });
  });
});
