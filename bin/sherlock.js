#!/usr/bin/env node

const cli = require('yargs')

const usernameFinder = require('../src')
const generateAsciiReport = require('../src/reports/generate-ascii-report')
const generateCsvReport = require('../src/reports/generate-csv-report')

module.exports =
  cli
    .help()
    .usage('sherlock USERNAMES [options]')
    .command({
      // Using an space since the .positional is not detecting it if I put it in the beginning
      command: [' <username>', '$0'],
      desc: 'pass the username you want to search for',
      builder: yargs => {
      yargs.positional('username', {
          describe: 'Username to search',
          type: 'string',
        })
      },
      handler: (argv) => {
        const networks = argv.networks || argv.N
        const username = argv.username
        const reportType = argv.report

        return usernameFinder({networks, username, showProgressBar: true}).then(results => {
          switch(reportType){
            case 'ASCII':
              return console.log(generateAsciiReport(results))
            case 'CSV':
              return generateCsvReport(results).then(data => console.log(data))
          }
        })
      }
    })
    .option('report', {
      describe: 'Specify the report you want',
      choices: ['CSV', 'ASCII'],
      default: 'ASCII'
    })
    .option('networks', {
      describe: `Provide a comma-separated list of the social networks you want to evaluate, Ex. facebook,instagram`,
      alias: 'N',
      default: 'all',
      type: 'string'
    })
    .wrap(Math.min(120, cli.terminalWidth()))
    .argv
