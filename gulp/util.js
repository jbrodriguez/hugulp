// system
const fs = require('fs')
const path = require('path')

// common
const gulp = require('gulp')

// styles
const sass = require('gulp-sass')
const less = require('gulp-less')
const concat = require('gulp-concat')

// parameters
const config = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), '.hugulprc'))
)

// helper functions
function getStylesStreams() {
  const lessStream = gulp
    .src(path.join(config.watch.source, config.path.styles, '**/*.less')) // i.e.: assets/styles/**/*.less
    .pipe(less())
    .pipe(concat('less-files.css'))

  const scssStream = gulp
    .src(path.join(config.watch.source, config.path.styles, '**/*.s[a|c]ss')) // i.e.: assets/styles/**/*.s[a|c]ss
    .pipe(sass())
    .pipe(concat('scss-files.css'))

  const cssStream = gulp
    .src(path.join(config.watch.source, config.path.styles, '**/*.css')) // i.e.: assets/styles/**/*.css
    .pipe(concat('css-files.css'))

  return [lessStream, scssStream, cssStream]
}

module.exports = { getStylesStreams }
