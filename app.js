const app = require('express')()
const Promise = require('bluebird')
const TIMEOUT = 1000
const RETRIES = Number.MAX_VALUES

function getSoapClient(num) {
  console.log(num)
  return new Promise(function(resolve) {
        if (num > RETRIES) {
          resolve('Hi!')
        } else {
          throw Error
        }
  })
}

function getClient(num=0) {
    return getSoapClient(num)
        .then(client=> {
            return client;
        })
        .catch(()=> {
            return Promise.delay(Math.random() * 1).then(()=>getClient(num+1))
        });
}

client = getClient()

function clientOrTimeout() {
  return client.timeout(TIMEOUT, Promise.TimeoutError);
}


app.get('/', function(req, res) {
  clientOrTimeout().then(function(data) {
    res.json('client: ' + data)
  }).catch(function(err) {
    res.json('timeout')
  })
})


app.listen(8001, ()=>console.log('listen'))
