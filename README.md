Eyedropper POC for GSoC 2026

Link to view it: [Pixel-Inspector](https://aashu2006.github.io/p5-web-editor-eyedropper-poc/)

A proof-of-concept for the eyedropper pixel inspector I am building for the p5.js Web Editor as part of the proposal for GSoC 2026.
This Samples a pixel from a WebGL canvas using `gl.readPixels()` and shows its RGBA values in a side panel in real time. Press E to toggle the inspector on and off.

This PoC shows what the injected script will do inside the sketch environment. In the actual implementation, this logic gets injected into the sketch iframe via `EmbedFrame.jsx` following the same pattern the editor already uses for accessibility features. It is not a core library change.
