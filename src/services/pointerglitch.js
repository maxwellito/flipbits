function pointerglitch () {

  var redirectLength = Math.floor((1 + Math.random()) * 50),
      redirect = []
  
  // Generate the array map
  for (var i = 0; i < redirectLength; i++) redirect.push(i)
  redirect.sort(function () {return Math.random() - 0.5})

  // Function to get random points
  return function (index, max) {
    var offset = max % redirectLength,
        chunk = index - offset,
        blockLength = Math.floor(chunk/redirectLength)
      

    if (index < offset) {
      return index
    }
    else {
      return offset + (blockLength * redirectLength) + redirect[chunk % redirectLength]
    }
  }
}
