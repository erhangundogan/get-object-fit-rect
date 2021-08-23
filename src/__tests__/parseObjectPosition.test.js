const { parseObjectPosition } = require('../parseObjectPosition');

describe('parseObjectPosition', () => {
  test('empty', () => {
    expect(parseObjectPosition('')).toEqual({ x: '50%', y: '50%' });
  });
  test('whitespaces', () => {
    expect(parseObjectPosition('   ')).toEqual({ x: '50%', y: '50%' });
  });
  test('partially accepted', () => {
    expect(parseObjectPosition('failure text')).toEqual({ x: '50%', y: '50%' });
    expect(parseObjectPosition('top fail')).toEqual({ x: '50%', y: '0%' });
    expect(parseObjectPosition('25% whatever')).toEqual({ x: '25%', y: '50%' });
  });
  test('[value]', () => {
    expect(parseObjectPosition('20px')).toEqual({ x: '20px', y: '50%' });
    expect(parseObjectPosition('25%')).toEqual({ x: '25%', y: '50%' });
  });
  test('[keyword]', () => {
    expect(parseObjectPosition('center')).toEqual({ x: '50%', y: '50%' });
    expect(parseObjectPosition('left')).toEqual({ x: '0%', y: '50%' });
    expect(parseObjectPosition('bottom')).toEqual({ x: '50%', y: '100%' });
    expect(parseObjectPosition('right')).toEqual({ x: '100%', y: '50%' });
  });
  test('[keyword keyword]', () => {
    expect(parseObjectPosition('left bottom')).toEqual({ x: '0%', y: '100%' });
  });
  test('[keyword value]', () => {
    expect(parseObjectPosition('left 30%')).toEqual({ x: '0%', y: '30%' });
    expect(parseObjectPosition('right 30%')).toEqual({ x: '100%', y: '30%' });
    expect(parseObjectPosition('10% bottom')).toEqual({ x: '10%', y: '100%' });
    expect(parseObjectPosition('50px top')).toEqual({ x: '50px', y: '0%' });
  });
  test('[value value]', () => {
    expect(parseObjectPosition('100px 0')).toEqual({ x: '100px', y: '0' });
    expect(parseObjectPosition('8rem 5vmin')).toEqual({ x: '8rem', y: '5vmin' });
    expect(parseObjectPosition('0% 20%')).toEqual({ x: '0%', y: '20%' });
  });
  test('[keyword value keyword value]', () => {
    expect(parseObjectPosition('left 20% bottom 30%')).toEqual({ x: '20%', y: '70%' });
    expect(parseObjectPosition('top 0% left 55.5%')).toEqual({ x: '55.5%', y: '0%' });
  });
  test('[keyword value keyword value] failure', () => {
    expect(parseObjectPosition('left 20% right 30%')).toEqual({ x: '50%', y: '50%' });
  });
});
