export interface Size {
  width: number;
  height: number;
}
export interface Alignment {
  horizontal: number;
  vertical: number;
}
export interface GetObjectFitRectProps {
  intrinsicSize: Size;
  renderedSize: Size;
  alignment?: Alignment;
}
export interface AbsoluteResult {
  top: number;
  left: number;
  bottom: number;
  right: number;
  width: number;
  height: number;
}
export interface RelativeResult {
  top: string | number;
  left: string | number;
  height: string;
  width: string;
}
export interface GetObjectFitRectResult {
  absolute: AbsoluteResult;
  relative: RelativeResult;
}
/**
 * getObjectFitRect: Calculate the visible portion of resized (object-fit: cover) image.
 * @param intrinsicSize - width: image.naturalWidth, height: image.naturalHeight
 * @param renderedSize - width: image.width, height: image.height
 * @param alignment - horizontal, vertical (object-position: 50% 50%)
 * @returns {{
 *   absolute: {top: number, left: number, bottom: number, right: number, width: number, height: number},
 *   relative: {top: string, left: string, width: string, height: string}
 * }}
 */
export const getObjectFitRect = ({
  intrinsicSize,
  renderedSize,
  alignment = { horizontal: 0.5, vertical: 0.5 }
}: GetObjectFitRectProps): GetObjectFitRectResult => {
  const { width: intrinsicWidth, height: intrinsicHeight } = intrinsicSize;
  const { width: renderedWidth, height: renderedHeight } = renderedSize;
  const { horizontal: horizontalAlignment, vertical: verticalAlignment } = alignment;

  const intrinsicAspectRatio = intrinsicWidth / intrinsicHeight;
  const renderedAspectRatio = renderedWidth / renderedHeight;

  if (renderedAspectRatio > 1) {
    const expectedHeight = renderedWidth / intrinsicAspectRatio;
    const visibleHeightEstimated = (renderedHeight * 100) / expectedHeight;
    const visibleHeight = visibleHeightEstimated > 100 ? 100 : visibleHeightEstimated;
    const adjustment = (100 - visibleHeight) / 100;
    const topPercent = adjustment * verticalAlignment * 100;
    const relative = {
      top: `${topPercent}%`,
      left: 0,
      height: `${visibleHeight}%`,
      width: '100%'
    };
    const absoluteTop = (topPercent * intrinsicHeight) / 100;
    const absoluteHeight = (visibleHeight * intrinsicHeight) / 100;
    const absolute = {
      top: absoluteTop,
      left: 0,
      bottom: intrinsicHeight - (absoluteTop + absoluteHeight),
      right: 0,
      width: intrinsicWidth,
      height: absoluteHeight
    };
    return {
      relative,
      absolute
    };
  }

  if (renderedAspectRatio < 1) {
    const expectedWidth = renderedHeight * intrinsicAspectRatio;
    const visibleWidthEstimated = (renderedWidth * 100) / expectedWidth;
    const visibleWidth = visibleWidthEstimated > 100 ? 100 : visibleWidthEstimated;
    const adjustment = (100 - visibleWidth) / 100;
    const leftPercent = adjustment * horizontalAlignment * 100;
    const relative = {
      top: 0,
      left: `${leftPercent}%`,
      height: '100%',
      width: `${visibleWidth}%`
    };
    const absoluteLeft = (leftPercent * intrinsicWidth) / 100;
    const absoluteWidth = (visibleWidth * intrinsicWidth) / 100;
    const absolute = {
      top: 0,
      left: absoluteLeft,
      bottom: 0,
      right: intrinsicWidth - (absoluteLeft + absoluteWidth),
      width: absoluteWidth,
      height: intrinsicHeight
    };
    return {
      relative,
      absolute
    };
  }

  // renderedAspectRatio === 1
  const relative = {
    top: '0px',
    left: '0px',
    height: '100%',
    width: '100%'
  };
  const absolute = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: intrinsicWidth,
    height: intrinsicHeight
  };
  return {
    relative,
    absolute
  };
};
