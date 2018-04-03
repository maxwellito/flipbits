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




// console.time('#10   ')
// let ten = new Mapper(10, .4)
// console.timeEnd('#10   ')

console.time('#100  ')
let hundred = new Mapper(100, .4)
console.timeEnd('#100  ')

for (let i = 0; i < 10; i++)
  console.log(hundred.stack.slice(i*10,(i+1)*10))
// console.time('#1000 ')
// let thousand = new Mapper(1000, .4)
// console.timeEnd('#1000 ')


// console.time('#10000')
// let tenthousand = new Mapper(10000, .4)
// console.timeEnd('#10000')