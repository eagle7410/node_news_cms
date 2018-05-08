// https://github.com/shelljs/shelljs
require('./check-versions')()

process.env.NODE_ENV = 'production'
const fs = require('fs');
const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const shell = require('shelljs')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start();

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
shell.rm('-rf', assetsPath)
shell.mkdir('-p', assetsPath)
shell.config.silent = true
shell.cp('-R', 'assets/*')

const attachToProd = async () => {
    shell.rm('-rf', `${__dirname}/../../static`)
    shell.mkdir('-p', `${__dirname}/../../static`)
    shell.cp('-R', `${__dirname}/../dist/static`, `${__dirname}/../../`);
    shell.cp('-R', `${__dirname}/../dist/index.html`, `${__dirname}/../../static/index.html`);
    shell.cp('-R', `${__dirname}/../static/img/favicon.png`, `${__dirname}/../../static/img/favicon.png`);
    shell.cp('-R', `${__dirname}/../static/img/index.ring-loading-gif.svg`, `${__dirname}/../../static/img/index.ring-loading-gif.svg`);
    shell.cp('-R', `${__dirname}/../static/img/sidebar-1.jpg`, `${__dirname}/../../static/img/sidebar-1.jpg`);
}

shell.config.silent = false

webpack(webpackConfig, async function (err, stats) {

    if (err) {
        spinner.stop()
        throw err;
    }

    await attachToProd();

    spinner.stop()
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
    ))
})
