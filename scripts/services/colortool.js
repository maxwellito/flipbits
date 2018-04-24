/**
 * Set of tools to manipulate colors
 */

var colortool = {

  /**
   * Create gradients of grey
   * Specify the color to start and end with plus
   * the amount of intermediate steps.
   * The method will return an array of string
   * format hex string.
   *
   * Example:
   * greydient('99', 'FF', 2)
   * > ['#999999', '#bbbbbb', '#dddddd', '#ffffff']
   * @param  {Number|String} colorStart Start gradient color (: '99' or 153)
   * @param  {Number|String} colorEnd   End gradient color (: 'FF' or 255)
   * @param  {Number}        steps      Amount of intermediate colors
   * @return {Array}                    Color list
   */
  gradient: function (colorStart, colorEnd, steps = 128) {
    // Convert to number if hex string
    colorStart = this.hexToInt(colorStart)
    colorEnd   = this.hexToInt(colorEnd)

    // Linit to the spectrum
    var diff = {
      r: colorEnd.r - colorStart.r,
      g: colorEnd.g - colorStart.g,
      b: colorEnd.b - colorStart.b
    }
    console.log(colorStart, colorEnd)
    var scale = steps - 1
    var output = []
    for (var i = 0; i < steps; i++) {
      output.push(this.rgbToHex(
        colorStart.r + (i / scale) * diff.r,
        colorStart.g + (i / scale) * diff.g,
        colorStart.b + (i / scale) * diff.b
      ))
    }
    return output
  },

  hexToInt: function (color) {
    var p = [color.slice(1,3), color.slice(3,5), color.slice(5,7)].map(c => parseInt(c, 16))
    return {
      r: p[0],
      g: p[1],
      b: p[2]
    }
  },

  rgbToHex: function (r,g,b) {
    return '#' + Array.prototype.slice.call(arguments)
            .map(c => Math.floor(c).toString(16))
            .map(c => c.length === 1 ? '0'+c : c)
            .join('')
  }
}

