let myShader;
let eyedropperOn = true;
let lastMX = -1;
let lastMY = -1;

function preload() {
  myShader = loadShader("shader.vert", "shader.frag");
}

function setup() {
  let canvas = createCanvas(900,650,WEBGL);
  canvas.parent("canvas-holder");
  pixelDensity(1);
}

function draw() {
  background(0);

  shader(myShader);
  myShader.setUniform("u_resolution", [width,height]);

  plane(width,height);

  // Only sample when eyedropper is on and cursor has moved
  if (eyedropperOn && (mouseX !== lastMX || mouseY !== lastMY)) {
    readPixel();
    lastMX = mouseX;
    lastMY = mouseY;
  }

  resetShader();

  if (eyedropperOn && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    drawCrosshair();
  }
}

// Toggle eyedropper with E key
function keyPressed() {
  if (key === 'e' || key === 'E') {
    eyedropperOn = !eyedropperOn;
    document.getElementById("toggle-status").innerText =
      eyedropperOn ? "Eyedropper ON (press E to toggle)" : "Eyedropper OFF (press E to toggle)";
  }
}

// Sampling the GPU rendered pixel under the cursor
// Using WebGL's readPixels() and display the RGBA values
function readPixel() {
  let gl = drawingContext;
  let x = floor(mouseX);
  let y = floor(height - mouseY); // WebGL Y-axis is flipped

  if (x<0 || y<0 || x >= width || y >= height) return;

  let pixel = new Uint8Array(4);
  gl.readPixels(x,y,1,1,gl.RGBA,gl.UNSIGNED_BYTE,pixel);

  let r = (pixel[0]/255).toFixed(3);
  let g = (pixel[1]/255).toFixed(3);
  let b = (pixel[2]/255).toFixed(3);
  let a = (pixel[3]/255).toFixed(3);

  document.getElementById("px").innerText = x;
  document.getElementById("py").innerText = y;
  document.getElementById("pr").innerText = r;
  document.getElementById("pg").innerText = g;
  document.getElementById("pb").innerText = b;
  document.getElementById("pa").innerText = a;

  // Update the color swatch
  document.getElementById("swatch").style.background =
    `rgba(${pixel[0]},${pixel[1]},${pixel[2]},${pixel[3]/255})`;
}

function drawCrosshair() {
  let gl = drawingContext;

  gl.disable(gl.DEPTH_TEST)

  push();
  translate(-width/2, -height/2);
  stroke(255);
  strokeWeight(1.5);
  line(mouseX-3,mouseY,mouseX+3,mouseY);
  line(mouseX,mouseY-3,mouseX,mouseY+3);
  pop();

  gl.enable(gl.DEPTH_TEST);

}
