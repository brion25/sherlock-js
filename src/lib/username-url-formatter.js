function usernameURLFormatter (username, networks) {
  return function (networkName) {
    const network =  networks[networkName] || {}
    const { url = '' } = network

    return {
      url: url.replace('{}', username),
      name: networkName
    }
  }
}

module.exports = usernameURLFormatter
