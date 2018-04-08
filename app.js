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
    setTimeout(function () {
      var end = document.createElement('h1')
      end.textContent = (map.ratio * 100).toFixed(2)
      document.body.appendChild(end)
      window.scrollTo(0, 9999999)

      
      document.body.style.backgroundColor = (map.ratio > .5) ? '#1af' : '#000'
      
    }, 2000)
    return
  }
  var toReach = Math.floor(exp(ratio) * map.size);

  var dot
  console.time('xx')
  for (; counter < toReach; counter++) {
    dot = blast(counter, length)
    grid.setDot(dot, map.stack[dot])
  }
  console.timeEnd('xx')
  
  window.scrollTo(0, (grid.lines * grid.unitSize)*exp(ratio) - 400)
  requestAnimationFrame(xx)

}

let dotLength, dotWidth, padding


var redirectLength = 84,
    redirect = []
for (let i = 0; i < redirectLength; i++) redirect.push(i)
redirect.sort(function () {return Math.random() - 0.5})


function blast (x, max) {
  var z = x % redirectLength,
      base = Math.floor(x/redirect.length)
  if (base === Math.floor(max/redirect.length)) {
    return x
  }
  else {
    return base * redirectLength + redirect[z]
  }
}

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