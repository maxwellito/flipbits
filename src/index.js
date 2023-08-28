function App () {

  this.dotLength = 0;
  this.windowRect = document.body.getBoundingClientRect()
  
  // Init slider
  this.slider = new SliderCtrl(3000, this.start.bind(this))
  document.body.appendChild(this.slider.el)

  this.grid = new GridCtrl(4, 8)
  document.body.appendChild(this.grid.el);

  this.summary = new SummaryCtrl(this.retry.bind(this))
  this.summary.hide()
  document.body.appendChild(this.summary.el)

  // Binded listeners
  this.scrollBinded = this.scroll.bind(this)
}

App.prototype.start = function (dotLength) {
  this.dotLength = dotLength
  this.duration = dotLength * 3 + 500
  this.starter = Date.now()
  this.counter = 0
  this.allocator = pointerglitch()
  
  this.map = new Mapper(dotLength);
  this.grid.setup(dotLength, this.windowRect.width)
  this.grid.show()
  this.summary.reset()
  this.summary.show()

  this.scrollLength = this.windowRect.height * 1.2 + (this.grid.lines * this.grid.unitSize)

  this.scroll()
}

App.prototype.scroll = function () {
  var ratio = Math.min(1, (Date.now() - this.starter) / this.duration)
  var toReach = Math.floor(ratio * this.map.size);
  var dot

  for (; this.counter < toReach; this.counter++) {
    dot = this.allocator(this.counter, this.dotLength)
    this.grid.setDot(dot, this.map.stack[dot])
  }
  
  document.body.scrollTo(0, this.scrollLength * ratio)

  if (ratio === 1) {
    this.scrollEnd()
  }
  else {
    requestAnimationFrame(this.scrollBinded)
  }
}

App.prototype.scrollEnd = function () {
  this.slider.reset();
  this.summary.set(this.dotLength, this.map.posPins)
  this.summary.show()
}

App.prototype.retry = function () {
  window.scrollTo(0, 0)
  this.summary.reset()
  this.summary.hide()
  this.grid.hide()
}