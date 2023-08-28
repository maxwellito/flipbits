var COLOR_SUCCESS = [15, 171, 255];
var COLOR_FAIL = [224, 0, 67];

/**
 * Summary Controller
 * Display the final information about the
 * a test run
 */
function SummaryCtrl (retryCallback) {

  this.retryCallback = retryCallback || function () {};
  this.backgroundFade = 0;
  this.backgroundFadeTimeout = 0;
  this.backgroundFadeUpdate = this.backgroundFadeUpdate.bind(this);
  this.themeColorDom = window.document.querySelector('meta[name="theme-color"]');
  
  // Start creation
  this.setupTemplate()
}

/**
 * Build template of the controller
 * @return {DOMElement}
 */
SummaryCtrl.prototype.setupTemplate = function () {
  this.resultEl = dom.create('p', 'summary-counter-wrap')
  this.counterDigitEl = dom.create('span');
  this.counterDecimalEl = dom.create('span', 'small');
  var counterWrap = dom.create('p', 'summary-counter-wrap-sub', [this.counterDigitEl, this.counterDecimalEl])
  this.counterEl = dom.create('div', 'summary-counter', [this.resultEl, counterWrap])

  this.resetEl = dom.create('button', 'pill', 'RETRY')
  this.resetEl.addEventListener('click', this.retryCallback)
  this.resetEl.addEventListener('touchend', this.retryCallback)
  var reset = dom.create('div', 'summary-bloc summary-item', [this.resetEl])

  this.detailsPosEl = dom.create('div', 'summary-item bordered pin-pos')
  this.detailsNegEl = dom.create('div', 'summary-item bordered pin-neg')
  this.detailsEl = dom.create('div', 'summary-bloc', [this.detailsPosEl, this.detailsNegEl])

  var social = document.createElement('div')
  social.classList.add('summary-bloc', 'summary-item', 'bordered')

  this.el = dom.create('div', 'summary-ctrl', [
    this.counterEl,
    reset,
    dom.create('div', '', [this.detailsEl, social])
  ]);
}

// Actions

/**
 * Reset the controller
 */
SummaryCtrl.prototype.set = function (dotLength, posDots) {
  // Set the counter
  var value = ((posDots / dotLength) * 100).toFixed(2).split('.');

  this.counterDecimalEl.textContent = '.' + value[1] + '%';
  this.counterDigitEl.textContent = value[0];

  this.detailsPosEl.textContent = posDots;
  this.detailsNegEl.textContent = (dotLength - posDots);

  var extraPosDots = posDots - (dotLength/2)
  if (extraPosDots > 0) {
    // this.el.classList.add('success')
    this.resultEl.textContent = 'Yes!'
    this.backgroundColor = COLOR_SUCCESS;
    this.startBackgroundFade();
  }
  else if (extraPosDots < 0) {
    // this.el.classList.add('fail')
    this.resultEl.textContent = 'Nope.'
    this.backgroundColor = COLOR_FAIL;
    this.startBackgroundFade();
  }
  else {
    this.resultEl.textContent = 'Try again';
    this.themeColorDom.setAttribute('content', '#000');
  }

  this.el.classList.add('ready')
}

SummaryCtrl.prototype.show = function () {
  this.el.style.display = '';
}

SummaryCtrl.prototype.hide = function () {
  this.el.style.display = 'none';
}

SummaryCtrl.prototype.reset = function () {
  this.el.classList.remove('ready')
  this.el.style.backgroundColor = '#000';

  cancelAnimationFrame(this.backgroundFadeTimeout);
  clearTimeout(this.backgroundFadeTimeout);
  this.backgroundFadeTimeout = 0;

  this.resultEl.textContent = '';
  this.themeColorDom.setAttribute('content', '#000');
}


SummaryCtrl.prototype.startBackgroundFade = function () {
  if (this.backgroundFadeTimeout) {
    return;
  }
  this.backgroundFade = 0;
  this.backgroundFadeTimeout = setTimeout(this.backgroundFadeUpdate, 800);
}

SummaryCtrl.prototype.backgroundFadeUpdate = function () {
  this.backgroundFade += 1/32;
  var backgroundFade = this.backgroundFade;
  var rgb = this.backgroundColor.map(function(x) {return Math.floor(x*backgroundFade)});
  var color = 'rgb('+rgb[0]+', '+rgb[1]+', '+rgb[2]+')';

  this.themeColorDom.setAttribute('content', color);
  this.el.style.backgroundColor = color;

  if (this.backgroundFade === 1) {
    this.backgroundFadeTimeout = 0;
  } else {
    this.backgroundFadeTimeout = requestAnimationFrame(this.backgroundFadeUpdate);
  }
}