// system
const fs = require('fs')
const path = require('path')

// parameters
const config = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), '.hugulprc'))
)

// common
const gulp = require('gulp')
const sequence = require('run-sequence')
const debug = require('gulp-debug')
const size = require('gulp-size')
const pump = require('pump')
const gutil = require('gulp-util')

// images
const imagemin = require('gulp-imagemin')

// styles
const autoprefixer = require('gulp-autoprefixer')
const cleancss = require('gulp-clean-css')
const merge = require('merge-stream')
const concat = require('gulp-concat')
const helper = require('./util')
// const changed = require('gulp-changed')

// scripts
const jshint = require('gulp-jshint')
const uglify = require('gulp-uglify')

// revision
const rev = require('gulp-rev')
const revdel = require('rev-del')
const delorg = require('gulp-rev-delete-original')
const del = require('del')

// reference
const replace = require('gulp-rev-replace')

// minify html
const htmlmin = require('gulp-htmlmin')

gulp.task('build', function(cb) {
  gutil.log(
    gutil.colors.green(`building site ... (${JSON.stringify(config.pipeline)})`)
  )

  // config.pipeline is an array of task names
  // i.e.: ['images', 'styles']
  sequence(...config.pipeline, cb)
})

// .pipe(changed('staging/img'))
gulp.task('images', function() {
  return gulp
    .src(path.join(config.build.source, config.path.images, '**', '*.*')) // i.e.: public/images/**/*.*
    .pipe(
      imagemin([
        imagemin.gifsicle(config.gifsicle),
        imagemin.jpegtran(config.jpegtran),
        imagemin.optipng(config.optipng),
        imagemin.svgo(config.svgo)
      ])
    )
    .pipe(gulp.dest(path.join(config.build.target, config.path.images))) // i.e.: public/images
})

gulp.task('styles:cleancss', function() {
  const streams = helper.getStylesStreams()

  return merge(...streams)
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(cleancss(config.cleancss))
    .pipe(concat('styles.css'))
    .pipe(size({ title: 'styles: ' }))
    .pipe(gulp.dest(path.join(config.build.target, config.path.styles))) // i.e.: public/styles/styles.css
})

// default styles task
gulp.task('styles', function(cb) {
  sequence('styles:cleancss', cb)
})

gulp.task('scripts', function() {
  return gulp
    .src(path.join(config.watch.source, config.path.scripts, '**', '*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(size({ title: 'scripts: ' }))
    .pipe(gulp.dest(path.join(config.build.target, config.path.scripts)))
})

gulp.task('revision', function() {
  return gulp
    .src(
      [
        path.join(config.build.source, config.path.styles, '**/*.css'),
        path.join(config.build.source, config.path.scripts, '**/*.js'),
        path.join(config.build.source, config.path.images, '**/*.*')
      ],
      { base: path.join(process.cwd(), config.build.source) }
    )
    .pipe(rev())
    .pipe(delorg())
    .pipe(gulp.dest(config.build.target))
    .pipe(rev.manifest())
    .pipe(revdel({ dest: config.build.target }))
    .pipe(gulp.dest(config.build.target))
})

gulp.task('reference', function() {
  const manifest = gulp.src(path.join(config.build.source, 'rev-manifest.json'))

  return gulp
    .src([
      path.join(config.build.source, '**/*.html'),
      path.join(config.build.source, '**/*.xml'),
      path.join(config.build.source, '**/*.css')
    ])
    .pipe(
      replace({
        manifest: manifest,
        replaceInExtensions: ['.html', '.xml', '.css']
      })
    )
    .pipe(gulp.dest(config.build.target))
})

gulp.task('fingerprint', function(cb) {
  sequence('revision', 'reference', cb)
})

gulp.task('html', function(cb) {
  pump(
    [
      gulp.src(path.join(config.build.source, '**', '*.html')),
      htmlmin(config.htmlmin),
      size({ title: 'html: ' }),
      gulp.dest(config.build.target)
    ],
    cb
  )
})
