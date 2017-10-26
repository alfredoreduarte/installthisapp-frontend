//
// Merges two collections based on a common key
//
const merge = (a, b, key) => {
  function x(a) {
    a.forEach(function(b) {
      if (!(b[key] in obj)) {
        obj[b[key]] = obj[b[key]] || {}
        array.push(obj[b[key]])
      }
      Object.keys(b).forEach(function(k) {
        obj[b[key]][k] = b[k]
      })
    })
  }

  var array = [],
    obj = {}

  x(a)
  x(b)
  return array
}

export default merge
