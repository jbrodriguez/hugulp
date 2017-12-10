#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const program = require('commander')
const gulp = require('gulp')
const pkginfo = require('pkginfo')(module, 'version')
function init() {
  gutil.log(gutil.colors.red(`hugulp v${module.exports.version}`))

  const hugulpRc = path.join(process.cwd(), '.hugulprc')

  if (fs.existsSync(hugulpRc)) {
    gutil.log(
      gutil.colors.yellow('.hugulprc already exists (initialization skipped)')
    )
    return
  }

  const config = {
    version: 1,
    pipeline: ['images', 'styles', 'scripts', 'fingerprint', 'html'],
    path: {
      styles: 'styles',
      images: 'images',
      scripts: 'scripts'
    },
    watch: {
      source: 'assets',
      target: 'static'
    },
    build: {
      source: 'public',
      target: 'public'
    },
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    cleancss: {
      advanced: false
    },
    htmlmin: {
      collapsedWhitespace: true,
      removeEmptyElements: true
    }
  }

  fs.writeFileSync(hugulpRc, JSON.stringify(config, null, '  '))

  gutil.log(
    gutil.colors.green(
      'hugulp has been initialized (.hugulprc was created with default values)'
    )
  )
}

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
