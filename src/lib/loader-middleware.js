const ProgressBar = require('progress')

function loaderMiddleware(showProgressBar, networks) {
  let progress = null
  if (showProgressBar) {
    progress = new ProgressBar('verifying [:bar] :percent :etas', {
      complete: '=',
      incomplete: ' ',
      width: 30,
      total: networks.length
    })

  }

  return function(promise) {
    return promise.then(result => {
      if (progress) {
        progress.tick(1)
      }

      return result
    })
  }
}

module.exports = loaderMiddleware
