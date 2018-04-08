function Grid (dotWidth, padding) {
  this.dotLength = null;
  this.dotWidth = dotWidth;
  this.dotRadius = this.dotWidth/2;
  this.padding = padding;
  this.unitSize = dotWidth + (2 * padding);

  this.posData = null;
  this.negData = null;
  
  this.setupTemplate()
}

Grid.prototype.setupTemplate = function () {
  this.el = dom.create('div')
}

Grid.prototype.setup = function (dotLength, canvasWidth) {

  // Set and reset
  this.dotLength = dotLength;
  if (this.canvas) {
    this.el.removeChild(this.canvas)
  }
  
  // Calculate canvas size
  this.rowLength = Math.floor(canvasWidth / this.unitSize) - 2;
  this.lines = Math.ceil(this.dotLength / this.rowLength);

  // Build the canvas
  this.canvas = document.createElement('canvas');
  this.ctx = this.canvas.getContext('2d');

  // Set display size (css pixels).
  this.canvas.style.width = (this.rowLength * this.unitSize) + 'px';
  this.canvas.style.height = (this.lines * this.unitSize) + 'px';

  // Set actual size in memory (scaled to account for extra pixel density).
  this.scale = window.devicePixelRatio; // <--- Change to 1 on retina screens to see blurry this.canvas.
  this.canvas.width = (this.rowLength * this.unitSize) * this.scale;
  this.canvas.height = (this.lines * this.unitSize) * this.scale;

  // Normalize coordinate system to use css pixels.
  this.ctx.scale(this.scale, this.scale);

  // Make wrapper
  this.el.appendChild(this.canvas)
}

Grid.prototype.setDot = function (index, isPos) {
  var pos = this.getPos(index);

  this.ctx.beginPath();
  this.ctx.fillStyle = isPos ? '#1af' : '#222';
  this.ctx.arc(pos.x, pos.y, this.dotRadius, 0, 2 * Math.PI);
  this.ctx.fill();
};

Grid.prototype.getPos = function (index) {
  return {
    x: ((index % this.rowLength) + .5) * this.unitSize,
    y: (Math.floor(index/this.rowLength) + .5) * this.unitSize
  };
};
