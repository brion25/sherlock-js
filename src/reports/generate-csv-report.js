const fs = require('fs')
const stringify = require('csv-stringify')

function generateCsvReport (networkResults) {
  const csvData = Object.keys(networkResults).reduce((networkRows, networkName) => {
    return [
      ...networkRows,
      [networkName, networkResults[networkName] ? 'Y' : 'N']
    ]
  }, [['Network', 'User Exists']])

  return new Promise(resolve => {
    stringify(csvData, (err, data) => {
      if (err) {
        throw new Error(err)
      }

      fs.writeFile('reports.csv', data, (err) => {
        if (err) {
          throw new Error(err)
        }

        resolve('File has been written as reports.cvs!')
      })
    })
  })
}

module.exports = generateCsvReport
