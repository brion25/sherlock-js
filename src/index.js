const _orderBy = require('lodash/orderBy')

const networksFeed = require('./networks')
const promisesHandler = require('./lib/promises-handler.js')
const usernameURLFormatter = require('./lib/username-url-formatter')
const loaderMiddleware = require('./lib/loader-middleware')

function usernameFinder (opts = {networks: 'all', username: '', showProgressBar: false}) {
  const { networks, username, showProgressBar } = opts

  if (networks === 'all') {
    const networkPromises = Object.keys(networksFeed)
      .map(usernameURLFormatter(username, networksFeed))
      .map(promisesHandler)
      .map(loaderMiddleware(showProgressBar, Object.keys(networksFeed)))

    return Promise.all(networkPromises).then(results => {
      const sortedResults = _orderBy(results, ['didSucceed'], ['desc'])

      return sortedResults.reduce((resultsObj, result) => {
        return {
          ...resultsObj,
          [result.name]: result.didSucceed
        }
      },{})
    })
  }
}

module.exports = usernameFinder
