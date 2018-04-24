var redirectLength = 112,
    redirect = []
for (let i = 0; i < redirectLength; i++) redirect.push(i)
redirect.sort(function () {return Math.random() - 0.5})


function blast (x, max) {
  var offset = max % redirectLength,
      chunk = x - offset,
      blockLength = Math.floor(chunk/redirectLength)
    

  if (x < offset) {
    return x
  }
  else {
    return offset + (blockLength * redirectLength) + redirect[chunk % redirectLength]
  }
}


var b
var s = []
var l = 2982
for (i = 0; i < l; i++) {
  b = blast (i, l)

  console.log(i + ' >> ' + b)
  if (~s.indexOf(b)) {
    console.log('WARNING!! FAILURE DETECTED!!')
  }
  s.push(b)
}

s.sort((a,b) => (a < b ? -1 : 1))
.forEach((val, index) => {
  if (val !== index) {
    console.log('WARNING!! FAILURE DETECTED!!', val, index)
  }
})

