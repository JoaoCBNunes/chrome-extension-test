# Chrome Image Size Checker Extension

This repository contains a minimal Chrome extension that reports images with an area of at least **1080×1080** pixels on the current page. It adds a pink panel to the top of the page listing the large images found.

## Installation

1. Open `chrome://extensions/` in Google Chrome.
2. Enable "Developer mode" in the top right corner.
3. Click "Load unpacked" and select the `extension` directory from this repository.
4. Visit any webpage. Click the extension icon to open a small popup where you
   can enable or disable the detection.

## Source Files

- `extension/manifest.json` – Chrome extension manifest
- `extension/content-script.js` – script injected into each page
- `extension/popup.html` and `extension/popup.js` – toggle UI

No build step or dependencies are required. The extension runs as soon as it is loaded.
