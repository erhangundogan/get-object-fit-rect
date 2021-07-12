getObjectFitRect
================

[![License][license-src]][license-href]

This package provides a method to calculate the bounding rectangle of the image rendered with "object-fit: cover" and object-position CSS rules.

[Demo][demo-href]

# Usage

```typescript
import { getObjectFitRect } from 'get-object-fit-rect';

const { absolute, relative } = getObjectFitRect = ({
  intrinsicSize, // image naturalWidth and image naturalHeight
  renderedSize, // expected image width and expected image height
  alignment = {
    horizontal: 0.5,
    vertical: 0.5
  } // object-position attribute (default: 50% 50% => 0.5 0.5) 
});
//expect(absolute).toEqual({ top: 0, left: 0, bottom: 0, right: 0 });
//expect(relative).toEqual({ top: '0px', left: '0px', height: '100%', width: '100%' });
```

# Install
```bash
npm install
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
