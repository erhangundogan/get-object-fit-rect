import { Alignment, getObjectFitRect, Size } from './getObjectFitRect';

export interface PixelPosition {
  x: number;
  y: number;
}

export interface PercentPosition {
  x: string;
  y: string;
}

export type ObjectFitType = 'cover' | 'contain' | 'fill';

export interface GetRelativePositionProps {
  position: PixelPosition;
  intrinsicSize: Size;
  renderedSize: Size;
  alignment?: Alignment;
  objectFitType?: ObjectFitType;
  percentResult?: boolean;
}

export const getRelativePosition = ({
  position,
  intrinsicSize,
  renderedSize,
  alignment = { horizontal: 0.5, vertical: 0.5 },
  objectFitType = 'cover',
  percentResult = true
}: GetRelativePositionProps): PixelPosition | PercentPosition | undefined => {
  if (!position || !intrinsicSize || !renderedSize) {
    return;
  }

  const { x, y } = position;

  if (objectFitType === 'cover') {
    const { absolute } = getObjectFitRect({ intrinsicSize, renderedSize, alignment });
    const { left, top, width, height } = absolute;

    if (x >= left && x <= left + width && y >= top && y <= top + height) {
      const relativeX = x - left;
      const relativeY = y - top;
      if (!percentResult) {
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
  } else if (objectFitType === 'contain') {
    const { width: intrinsicWidth, height: intrinsicHeight } = intrinsicSize;
    const { width: renderedWidth, height: renderedHeight } = renderedSize;
    const { horizontal: horizontalAlignment, vertical: verticalAlignment } = alignment;
    const intrinsicAspectRatio = intrinsicWidth / intrinsicHeight;

    if (intrinsicAspectRatio < 1) {
      const width = intrinsicAspectRatio * renderedHeight;
      const height = renderedHeight;
      const left = (renderedWidth - width) * horizontalAlignment;
      const relativeX = (x * width) / intrinsicWidth + left;
      const relativeY = (y * height) / intrinsicHeight;
      if (!percentResult) {
        return {
          x: relativeX,
          y: relativeY
        };
      }

      const percentX = (relativeX / renderedWidth) * 100;
      const percentY = (relativeY / renderedHeight) * 100;
      return {
        x: `${percentX}%`,
        y: `${percentY}%`
      };
    } else if (intrinsicAspectRatio > 1) {
      const height = renderedWidth / intrinsicAspectRatio;
      const width = renderedWidth;
      const top = (renderedHeight - height) * verticalAlignment;
      const relativeX = (x * width) / intrinsicWidth;
      const relativeY = (y * height) / intrinsicHeight + top;
      if (!percentResult) {
        return {
          x: relativeX,
          y: relativeY
        };
      }

      const percentX = (relativeX / renderedWidth) * 100;
      const percentY = (relativeY / renderedHeight) * 100;
      return {
        x: `${percentX}%`,
        y: `${percentY}%`
      };
    } else {
      if (!percentResult) {
        return { x, y };
      }
      const percentX = (x / renderedWidth) * 100;
      const percentY = (y / renderedHeight) * 100;
      return {
        x: `${percentX}%`,
        y: `${percentY}%`
      };
    }
  } else if (objectFitType === 'fill') {
    const { width: intrinsicWidth, height: intrinsicHeight } = intrinsicSize;
    const { width: renderedWidth, height: renderedHeight } = renderedSize;

    const relativeX = (x * renderedWidth) / intrinsicWidth;
    const relativeY = (y * renderedHeight) / intrinsicHeight;
    if (!percentResult) {
      return {
        x: relativeX,
        y: relativeY
      };
    }

    const percentX = (relativeX / renderedWidth) * 100;
    const percentY = (relativeY / renderedHeight) * 100;
    return {
      x: `${percentX}%`,
      y: `${percentY}%`
    };
  }
};
