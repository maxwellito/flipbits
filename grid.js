function Grid (dotLength, dotWidth, padding) {
  this.dotLength = dotLength;
  this.dotWidth = dotWidth;
  this.dotRadius = this.dotWidth/2;
  this.padding = padding;
  this.unitSize = dotWidth + (2 * padding);

  this.posData = null;
  this.negData = null;
  
  this.setup()
}

Grid.prototype.setup = function () {
  // Calculate canvas size
  rect = document.body.getBoundingClientRect();
  this.rowLength = Math.floor(rect.width / this.unitSize) - 2;
  this.lines = Math.ceil(this.dotLength / this.rowLength);

  // Build the canvas
  this.el = document.createElement('canvas');
  this.ctx = this.el.getContext('2d');

  // Set display size (css pixels).
  this.el.style.width = (this.rowLength * this.unitSize) + 'px';
  this.el.style.height = (this.lines * this.unitSize) + 'px';

  // Set actual size in memory (scaled to account for extra pixel density).
  this.scale = window.devicePixelRatio; // <--- Change to 1 on retina screens to see blurry this.el.
  this.el.width = (this.rowLength * this.unitSize) * this.scale;
  this.el.height = (this.lines * this.unitSize) * this.scale;

  // Normalize coordinate system to use css pixels.
  this.ctx.scale(this.scale, this.scale);

  // Set the canvas in the page
  document.body.appendChild(this.el);
}

Grid.prototype.setDot = function (index, isPos) {
  var dotData, dotPos;

  if ((isPos && !this.posData) || (!isPos && !this.negData)) {
    dotData = this.createDot(index, isPos)
    console.count(''+isPos)
    if (isPos) {
      this.posData = dotData;
    }
    else {
      this.negData = dotData;
    }
  }
  else {
    dotPos = this.getPos(index);
    dotData = isPos ? this.posData : this.negData;
    this.ctx.putImageData(
      dotData,
      (dotPos.x - this.dotRadius) * this.scale,
      (dotPos.y - this.dotRadius) * this.scale
    );
  }
}

Grid.prototype.createDot = function (index, isPos) {
  var pos = this.getPos(index);

  this.ctx.beginPath();
  this.ctx.fillStyle = isPos ? '#1af' : '#222';
  this.ctx.arc(pos.x, pos.y, this.dotRadius, 0, 2 * Math.PI);
  this.ctx.fill();

  return this.ctx.getImageData(
    (pos.x - this.dotRadius) * this.scale,
    (pos.y - this.dotRadius) * this.scale,
    (this.dotWidth) * this.scale,
    (this.dotWidth) * this.scale
  );
};

Grid.prototype.getPos = function (index) {
  return {
    x: ((index % this.rowLength) + .5) * this.unitSize,
    y: (Math.floor(index/this.rowLength) + .5) * this.unitSize
  };
};
