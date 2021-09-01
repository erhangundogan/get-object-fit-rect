export type IsResizedResult = boolean | undefined;

export function isResized(image: HTMLImageElement): IsResizedResult {
  if (!image) {
    return;
  }
  const { naturalWidth, naturalHeight, width, height } = image;
  if (naturalHeight && height) {
    const intrinsicAspectRatio = naturalWidth / naturalHeight;
    const currentAspectRatio = width / height;
    return intrinsicAspectRatio !== currentAspectRatio;
  }
}
