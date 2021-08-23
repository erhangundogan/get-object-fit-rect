import { AbsoluteResult } from './getObjectFitRect';

export interface PixelPosition {
  x: number;
  y: number;
}

export interface PercentPosition {
  x: string;
  y: string;
}

export const getRelativePosition = (
  position: PixelPosition,
  objectFitRect: AbsoluteResult,
  isPercent = true
): PixelPosition | PercentPosition | undefined => {
  if (!position || !objectFitRect) {
    return;
  }

  const { x, y } = position;
  const { left, top, width, height } = objectFitRect;

  if (x >= left && x <= left + width && y >= top && y <= top + height) {
    const relativeX = x - left;
    const relativeY = y - top;
    if (!isPercent) {
      return {
        x: relativeX,
        y: relativeY
      };
    }

    const percentX = (relativeX / width) * 100;
    const percentY = (relativeY / height) * 100;
    return {
      x: `${percentX}%`,
      y: `${percentY}%`
    };
  }
};
