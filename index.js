#!/usr/bin/env node

var sysPath = require('path')
var fs = require('fs')
var program = require('commander')
var gulp = require('gulp')

var join = sysPath.join

require(join(fs.realpathSync(__dirname), 'gulpfile'))

function bundle() {
    // console.log('gulpfile contains task!');
	gulp.start('bundle');
}

function watch() {
	gulp.start('serve')
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

program.parse(process.argv)
