var length = 2000
var counter = 0
var starter
var duration = length * 3
var dotStack = []
var exp = x => x// 1-Math.pow(1-x,6)

var pos = 0

function xx () {
  var ratio = (Date.now() - starter) / duration

  if (ratio > 1) {
    var end = document.createElement('h1')
    end.textContent = (map.ratio * 100).toFixed(2)
    document.body.appendChild(end)
    window.scrollTo(0, 9999999)
    return
  }
  var toReach = Math.floor(exp(ratio) * map.size);

  var dot
  for (; counter < toReach; counter++) {
    grid.setDot(counter, map.stack[counter])
  }
  
  window.scrollTo(0, (grid.lines * grid.unitSize)*exp(ratio) - 400)
  requestAnimationFrame(xx)

}

let dotLength, dotWidth, padding


let map, grid;

function starter () {
  starter = Date.now()
  counter = 0

  

  map = new Mapper(length);
  grid = new Grid(length, 4, 8)

  xx()
}






starter()
// Pluto que de creer un cercle a chaque fois, on peut recopier le raw data d'un cercle deja genere