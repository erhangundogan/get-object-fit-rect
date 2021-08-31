getObjectFitRect
================

[![License][license-src]][license-href]
[![Build Status][build-src]][build-href]

This package provides a methods below:

- Calculate bounding rectangle of the resized image having `object-fit` and `object-position` CSS styles.
- Get relative position on the resized image if it's visible.
- Determine if the image's aspect-ratio has changed.
- Parse getComputedStyle.objectPosition into x and y values.

[Demo][demo-href]

# Usage

Functions:
- getObjectFitRect: Absolute/relative rect information for the resized image.
- getRelativePosition: Relative position of the actual point or returns undefined if it's not visible. 
- isResized: Returns true if the image's aspect ratio has changed.
- parseObjectPosition: Parse getComputedStyle.objectPosition string into x and y values.

```typescript
const { absolute, relative } = getObjectFitRect = ({
  intrinsicSize, // image naturalWidth and image naturalHeight
  renderedSize, // expected image width and expected image height
});
/*
const absolute: AbsoluteResult = { top: 0, left: 35, bottom: 0, right: 35, width: 30, height: 100 };
const relative: RelativeResult = { top: 0, left: '35%', height: '100%', width: '30%' }
*/
```

# Install
```bash
npm install
```

# Tests
```bash
npm test
```

# Development
```bash
git clone git@github.com:erhangundogan/get-object-fit-rect.git
cd get-object-fit-rect
npm install
npm run build
npm test
```

[license-src]: https://img.shields.io/badge/license-MIT-brightgreen.svg
[license-href]: LICENSE.md
[demo-href]: https://codesandbox.io/s/get-object-fit-rect-cmnn1?file=/src/App.js
[build-src]: https://dev.azure.com/erhangundogan/get-object-fit-rect/_apis/build/status/erhangundogan.get-object-fit-rect?branchName=main
[build-href]: https://dev.azure.com/erhangundogan/get-object-fit-rect/_build/latest?definitionId=1&branchName=main
