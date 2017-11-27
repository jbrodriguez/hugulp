#!/usr/bin/env node

var sysPath = require('path')
var fs = require('fs')
var program = require('commander')
var gulp = require('gulp')
var pkginfo = require('pkginfo')(module, 'version');

var join = sysPath.join

require(join(fs.realpathSync(__dirname), 'gulpfile'))

function bundle() {
    // console.log('gulpfile contains task!');
	gulp.start('bundle');
}

function watch() {
	gulp.start('serve')
}

function version() {
	console.log("hugulp v" + module.exports.version)
}

function minifyhtml() {
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
