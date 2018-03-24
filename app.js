var length = 10000
var counter = 0
var starter
var duration = 5000
var dotStack = []
var exp = x =>  1-Math.pow(1-x,6)

var pos = 0

function xx () {
  var ratio = (Date.now() - starter) / duration
  if (ratio > 1) {

    var end = document.createElement('h1')
    end.textContent = ((pos / length) * 100).toFixed(2)
    document.body.appendChild(end)
    window.scrollTo(0, 9999999)
    return
  }
  var toReach = Math.floor(exp(ratio) * length);

  var dot
  for (; counter < toReach; counter++) {
    ctx.beginPath();
    // dotStack[counter].classList.add(counter % 7 > 5 || counter % 3 === 1 ? 'on' : 'off')
    if (randomer()) {
      ctx.fillStyle = '#1af';
      pos++
    }
    else {
      ctx.fillStyle = '#222';
    }

    ctx.arc(
      ((counter % rowLength) + .5) * (dotWidth + 2*padding),
      (Math.floor(counter/rowLength) + .5) * (dotWidth + 2*padding),
      dotWidth/2,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
  window.scrollTo(0, lines*(dotWidth + 2*padding)*exp(ratio) - 400)
  requestAnimationFrame(xx)

}

let dotLength, dotWidth, padding

function starter () {
  starter = Date.now()
  counter = 0

  


  // let dot;
  // for (let i = 0 ; i<length; i++) {
  //   dot = document.createElement('div')
  //   dot.classList.add('dot')
  //   document.body.appendChild(dot)
  //   dotStack.push(dot)
  // }

  dotLength = length
  dotWidth = 4
  padding =8
  createCanvas (dotLength, dotWidth, padding)

  xx()
}




let rect, rowLength, lines, leCanvas, ctx;

function createCanvas (dotLength, dotWidth, padding) {

  rect = document.body.getBoundingClientRect()
  rowLength = Math.floor(rect.width / (dotWidth + 2*padding)) - 2
  lines = Math.ceil(dotLength / rowLength)

       
  leCanvas = document.createElement('canvas')
  leCanvas.setAttribute('width', rowLength * (dotWidth + 2*padding))
  leCanvas.setAttribute('height', lines * (dotWidth + 2*padding))
  ctx = leCanvas.getContext('2d');


  document.body.appendChild(leCanvas);
}






randomer = (function () {
  var counter = 0;
  var max = 48;
  var rand = Math.random();

  return function () {
    if (counter === max) {
      counter = 0;
      rand = Math.random()
    }
    counter++;
    rand *= 2;
    return (rand % 1) > .5 
  }
})()

console.time('randomer')
for (var i = 0; i < 1000000; i++) {
  randomer()
}
console.timeEnd('randomer')

console.time('Math.random')
for (var i = 0; i < 1000000; i++) {
  Math.random() > .5
}
console.timeEnd('Math.random')




starter()
// Pluto que de creer un cercle a chaque fois, on peut recopier le raw data d'un cercle deja genere