#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const program = require('commander')
const gulp = require('gulp')
const pkginfo = require('pkginfo')(module, 'version')

function build() {
  require(path.join(fs.realpathSync(__dirname), 'gulp', 'build'))
  gulp.start('build')
}

function watch() {
  require(path.join(fs.realpathSync(__dirname), 'gulp', 'watch'))
  gulp.start('watch')
}

function version() {
  console.log('hugulp v' + module.exports.version)
}

function minifyhtml() {
  gulp.start('minifyhtml:minifyhtml')
}

program
  .command('build')
  .description('optimize site (for publishing purposes)')
  .action(build)

program
  .command('watch')
  .description('watch for changes to styles and/or javascript')
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
