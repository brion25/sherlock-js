const ProgressBar = require('progress')
const axios = require('axios')

function promisesHandler ({url, name}) {
  return axios.get(url)
    .then(() => ({
      didSucceed: true,
      name
    }))
    .catch(() => Promise.resolve({
      didSucceed: false,
      name
    }))

  /*
  const progress = new ProgressBar('verifying [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 30,
    total: networks.length
  })
  const results = {}

  const promises = networks.map(({url, name}) => {
    return axios.get(url)
      .then(result => {
        progress.tick(1)
        results[name] = true

        return result
      })
      .catch(error => {
        progress.tick(1)
        results[name] = false

        return Promise.resolve(error)
      })

  })
  */
}

module.exports = promisesHandler
