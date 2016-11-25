const Promise = require('bluebird')


function rec(i=0){
  return new Promise(function(resolve) {
    if(i > Number.MAX_VALUES) {
      resolve(i)
    }
    throw new Error()
  }).catch(function() {
    return rec(i+1)
  })
}

rec().then((i) => console.log('done with', i))
