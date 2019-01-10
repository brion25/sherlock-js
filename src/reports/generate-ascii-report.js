const AsciiTable = require('ascii-table')
const chalk = require('chalk')

function generateAsciiReport (networkResults) {
  const table = new AsciiTable('Social Networks')

  Object.keys(networkResults)
    .forEach((networkName) => {
      const networkResult = networkResults[networkName]
      let networkMsg

      if (networkResult) {
        networkMsg = chalk.green('✓')
      } else {
        networkMsg = chalk.red('X')
      }

      table.addRow(networkMsg, networkName)
    })
  table.removeBorder()
  return table.toString()
}

module.exports = generateAsciiReport
