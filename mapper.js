function Mapper (size, ratio) {
  this.size = size;
  this.stack = new Int8Array(size);

  this.ratio = ratio || Math.random();
  this.posPins = Math.round(this.ratio * this.size)
  this.negPins = this.size - this.posPins;
  this.fill()
}

Mapper.prototype.fill = function () {
  if (this.ratio > .5) {
    this.routing(this.negPins)
    this.invertFill()
  }
  else {
    this.routing(this.posPins)
  }
}

Mapper.prototype.invertFill = function () {
  for (let i = 0; i < this.size; i++) {
    this.stack[i] = this.stack[i] ? 0 : 1;
  }
}

Mapper.prototype.routing = function (fillLength) {
  let pos
  while (fillLength > 0) {
    pos = Math.floor(this.size * Math.random())
    if (!this.stack[pos]) {
      this.stack[pos] = 1;
      fillLength--;
    }
  }
}