/**
 * Summary Controller
 * Display the final information about the
 * a test run
 */
function SummaryCtrl (retryCallback) {

  this.retryCallback = retryCallback || function () {};
  
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

  var social = document.getElementById('social')
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
    this.el.classList.add('success')
    this.resultEl.textContent = 'Yas!'
  }
  else if (extraPosDots < 0) {
    this.el.classList.add('fail')
    this.resultEl.textContent = 'Nope.'
  }
  else {
    this.resultEl.textContent = 'Try again'
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
  this.el.classList.remove('success')
  this.el.classList.remove('fail')

  this.resultEl.textContent = ''
}