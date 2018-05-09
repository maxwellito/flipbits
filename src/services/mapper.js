function Mapper (size, ratio) {
  this.size = size;
  this.stack = new Int8Array(size);

  if (ratio !== undefined) {
    this.ratio = ratio;
    this.posPins = Math.round(this.ratio * this.size)
    this.negPins = this.size - this.posPins;
    this.fill()
  }
  else {
    this.posPins = 0
    this.negPins = 0
    this.randomFill()
  }
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
  for (var i = 0; i < this.size; i++) {
    this.stack[i] = this.stack[i] ? 0 : 1;
  }
}

Mapper.prototype.routing = function (fillLength) {
  var pos
  while (fillLength > 0) {
    pos = Math.floor(this.size * Math.random())
    if (!this.stack[pos]) {
      this.stack[pos] = 1;
      fillLength--;
    }
  }
}

Mapper.prototype.randomFill = function () {
  var val
  for (var i = 0; i < this.size; i++) {
    val = Math.round(Math.random())
    this.stack[i] = val
    if (val) {
      this.posPins++
    }
    else {
      this.negPins++
    }
  }
}