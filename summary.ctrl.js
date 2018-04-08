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
  this.counterDigit = dom.create('span');
  this.counterDecimal = dom.create('span', 'small');
  this.counterEl = dom.create('p', 'summary-item summary-counter', [this.counterDigit, this.counterDecimal])

  this.detailsPosEl = dom.create('div', 'summary-item')
  this.detailsNegEl = dom.create('div', 'summary-item')
  this.detailsEl = dom.create('div', 'summary-bloc', [this.detailsPosEl, this.detailsNegEl])

  this.resetEl = dom.create('button', 'summary-item', 'Retry')
  this.resetEl.addEventListener('click', this.retryCallback)

  this.el = dom.create('div', 'summary-ctrl', [
    this.counterEl,
    this.detailsEl,
    this.resetEl
  ]);
}

// Actions

/**
 * Reset the controller
 */
SummaryCtrl.prototype.set = function (dotLength, posDots) {
  // Set the counter
  var value = ((posDots / dotLength) * 100).toFixed(2).split('.');

  this.counterDecimal.textContent = '.' + value[1];
  this.counterDigit.textContent = value[0];

  this.detailsPosEl.textContent = posDots;
  this.detailsNegEl.textContent = (dotLength - posDots);
}