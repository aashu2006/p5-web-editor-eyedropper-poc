Eyedropper POC for GSoC 2026

Link to view it: [Pixel-Inspector](https://aashu2006.github.io/p5-web-editor-eyedropper-poc/)

Video demo: [Watch on YouTube](https://youtu.be/DdnAZjUvtPM)

A proof-of-concept for the eyedropper pixel inspector I am building for the p5.js Web Editor as part of the proposal for GSoC 2026.
It samples a pixel from a WebGL canvas using `gl.readPixels()` and shows its RGBA values in a side panel in real time. Press E to toggle the inspector on and off.

This PoC validates the core pixel sampling approach only. It does not include the iframe injection or `postMessage` communication - those are part of the actual Web Editor integration, which will follow the same pattern `EmbedFrame.jsx` already used for accessibility features. It is not a core library change.
