/**
 * Slider controller
 * Intro interface that allow user to
 * start the randomiser
 */
function SliderCtrl (rangeMax, callback) {
  this.rangeMax = rangeMax
  this.callback = callback

  // Create binded version of listeners
  this.slideStartBinded = this.slideStart.bind(this)
  this.slideUpdateBinded = this.slideUpdate.bind(this)
  this.slideEndBinded = this.slideEnd.bind(this)

  this.inputHeight = null
  this.slideStart = null
  this.isTouchSlide = null
  this.value = null

  // Start creation
  this.setupTemplate()
}

/**
 * Build template of the controller
 * @return {DOMElement}
 */
SliderCtrl.prototype.setupTemplate = function () {
  
  this.counterEl = dom.create('p', 'slider-counter', ' ')
  
  var x, y, rules = [dom.create('div', 'slider-input-ruler-large')]
  for (x = 0; x < 6; x++) {
    for (y = 0; y < 4; y++) {
      rules.push(dom.create('div', 'slider-input-ruler-thin'))
    }
    rules.push(dom.create('div', 'slider-input-ruler-large'))
  }
  var inputRuler = dom.create('div', 'slider-input-ruler', rules)
  this.inputThumbEl = dom.create('div', 'slider-input-thumb')
  this.inputContainerEl = dom.create('div', 'slider-input-container', [inputRuler, this.inputThumbEl])

  var introEl = dom.create('p', 'slider-intro', 'Slide down the circle to trigger')

  this.el = dom.create('div', 'slider-ctrl', [
    this.counterEl,
    this.inputContainerEl,
    introEl
  ])

  this.inputThumbEl.addEventListener('touchstart', this.slideStartBinded)
  this.inputThumbEl.addEventListener('mousedown', this.slideStartBinded)

  return this.el
}

// Actions

/**
 * Reset the controller
 */
SliderCtrl.prototype.reset = function () {
  this.counterEl.textContent = ''
}

// Listeners

/**
 * Listener for slide start
 * @param {Event} e 
 */
SliderCtrl.prototype.slideStart = function (e) {

  if (this.isTouchSlide !== null) {
    return;
  }

  // Kill the event
  e.preventDefault();
  e.stopPropagation();

  // Init slide values
  this.isTouchSlide = (e.type === 'touchstart')
  this.inputHeight = this.inputContainerEl.getBoundingClientRect().height - this.inputThumbEl.getBoundingClientRect().height;
  this.slideStart = this.isTouchSlide ? e.touches[0].pageY : e.screenY

  this.inputThumbEl.classList.remove('reset')

  // Start listen for move and end
  this.inputThumbEl.addEventListener('touchmove', this.slideUpdateBinded)
  window.addEventListener('mousemove', this.slideUpdateBinded)  
  this.inputThumbEl.addEventListener('touchend', this.slideEndBinded)
  window.addEventListener('mouseup', this.slideEndBinded)
}

/**
 * Listener for slide update
 * @param {Event} e 
 */
SliderCtrl.prototype.slideUpdate = function (e) {
  var newPos = this.isTouchSlide ? e.touches[0].pageY : e.screenY,
      translate = Math.min(this.inputHeight, Math.max(0, newPos - this.slideStart)),
      ratio = translate / this.inputHeight;

  let oldValue = this.value || 0
  this.value = Math.floor(this.rangeMax * ratio)
  this.counterEl.textContent = this.value
  this.inputThumbEl.style.top = translate + 'px'

  if (Math.floor(oldValue/500)!==Math.floor(this.value/500) && navigator.vibrate) {
    navigator.vibrate(20)
  }
}

/**
 * Listener for end of slide
 * @param {Event} e 
 */
SliderCtrl.prototype.slideEnd = function (e) {

  // Reset values
  this.isTouchSlide = null
  this.inputHeight = null
  this.slideStart = null

  this.inputThumbEl.style.top = '0'
  this.inputThumbEl.classList.add('reset')

  // Remove listeners
  this.inputThumbEl.removeEventListener('touchmove', this.slideUpdateBinded)
  window.removeEventListener('mousemove', this.slideUpdateBinded)  
  this.inputThumbEl.removeEventListener('touchend', this.slideEndBinded)
  window.removeEventListener('mouseup', this.slideEndBinded)

  // Trigger callback
  if (this.value) {
    this.callback(this.value)
  }
  this.value = null
}