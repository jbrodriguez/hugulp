#!/usr/bin/env node

const sysPath = require('path')
const fs = require('fs')
const program = require('commander')
const gulp = require('gulp')
// const pkginfo = require('pkginfo')(module, 'version')

const join = sysPath.join

require(join(fs.realpathSync(__dirname), 'gulpfile'))

function bundle () {
  gulp.start('bundle')
}

function watch () {
  gulp.start('serve')
}

function version () {
  console.log('hugulp v' + module.exports.version)
}

function minifyhtml () {
  gulp.start('minifyhtml:minifyhtml')
}

program
  .command('build')
  .option('-c, --config [value]', 'Define an alternative config')
  .description('build site (for publishing purposes)')
  .action(bundle)

program
  .command('watch')
  .option('-c, --config [value]', 'Define an alternative config')
  .description('build site and watch for changes')
  .action(watch)

program
  .command('version')
  .option('-v, --version', 'Display version')
  .description('display version information')
  .action(version)

program
  .command('minifyhtml')
  .description('minify your created html')
  .action(minifyhtml)

program.parse(process.argv)
