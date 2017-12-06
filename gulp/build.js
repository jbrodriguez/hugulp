// system
const fs = require('fs')
const path = require('path')

// parameters
const config = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), '.hugulprc')),
)

// common
const gulp = require('gulp')
const sequence = require('run-sequence')
const debug = require('gulp-debug')
const size = require('gulp-size')
const pump = require('pump')

// images
const imagemin = require('gulp-imagemin')

// styles
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleancss = require('gulp-clean-css')
const less = require('gulp-less')
const merge = require('merge-stream')
const concat = require('gulp-concat')
// const changed = require('gulp-changed')

// revision
const rev = require('gulp-rev')
const revdel = require('rev-del')
const delorg = require('gulp-rev-delete-original')
const vinylPaths = require('vinyl-paths')
const del = require('del')

// reference
const replace = require('gulp-rev-replace')

// minify Html
const htmlmin = require('gulp-htmlmin')

gulp.task('build', function(cb) {
  //   sequence('setup', config.pipeline, cb)
  //   sequence(config.pipeline.reverse(), cb)
  //   const series = spread(sequence, config.pipeline)
  //   sequence('images', 'revision')
  sequence(...config.pipeline)
})

// .pipe(changed('staging/img'))
gulp.task('images', function() {
  return gulp
    .src(path.join(config.build.source, config.path.images, '**/*.*')) // i.e.: public/images/**/*.*
    .pipe(imagemin())
    .pipe(gulp.dest(path.join(config.build.target, config.path.images))) // i.e.: public/images
})

gulp.task('styles', function() {
  const lessStream = gulp
    .src(path.join(config.watch.source, config.path.styles, '**/*.less')) // i.e.: public/styles/**/*.less
    .pipe(less())
    .pipe(concat('less-files.css'))

  const scssStream = gulp
    .src(path.join(config.watch.source, config.path.styles, '**/*.s[a|c]ss')) // i.e.: public/styles/**/*.s[a|c]ss
    .pipe(sass())
    .pipe(concat('scss-files.css'))

  const cssStream = gulp
    .src(path.join(config.watch.source, config.path.styles, '**/*.css')) // i.e.: public/styles/**/*.css
    .pipe(concat('css-files.css'))

  return merge(lessStream, scssStream, cssStream)
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(cleancss(config.cleancss))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(path.join(config.build.target, config.path.styles)))
})

gulp.task('revision', function() {
  //   return gulp
  //     .src(path.join(config.build.source, config.path.images, '**/*.*'))
  //     .pipe(rev())
  //     .pipe(delorg())
  //     .pipe(gulp.dest(path.join(config.build.target, config.path.images)))

  //   .pipe(rev.manifest())
  //   .pipe(
  //     revdel({ dest: path.join(config.build.target, config.path.images) }),
  //   )
  //   .pipe(gulp.dest(path.join(config.build.target, config.path.images))) )

  //   const imageStream = gulp.src(
  //     path.join(config.build.source, config.path.images, '**/*.*'),
  //   )

  //   const result = imageStream
  //     .pipe(rev())
  //     .pipe(delorg())
  //     .pipe(gulp.dest(config.build.target))

  //   const removal = imageStream
  //     .pipe(debug({ title: 'list' }))
  //     .pipe(vinylPaths(del))
  //     .pipe(debug({ title: 'del' }))
  //     .pipe(gulp.dest(path.join(config.build.target, config.path.images)))

  //   return merge(result, removal)
  return (gulp
      .src(
        [
          path.join(config.build.source, config.path.styles, '**/*.css'),
          path.join(config.build.source, config.path.scripts, '**/*.js'),
          //   path.join(config.build.source, config.build.images, '**/*.svg'),
          path.join(config.build.source, config.path.images, '**/*.*'),
        ],
        { base: path.join(process.cwd(), config.build.source) },
      )
      //   .pipe(debug({ title: 'source' }))
      .pipe(rev())
      //   .pipe(debug({ title: 'after rev' }))
      .pipe(delorg())
      .pipe(gulp.dest(config.build.target))
      .pipe(rev.manifest())
      .pipe(revdel({ dest: config.build.target }))
      .pipe(gulp.dest(config.build.target)) )
})

gulp.task('reference', function() {
  const manifest = gulp.src(path.join(config.build.source, 'rev-manifest.json'))

  return gulp
    .src([
      path.join(config.build.source, '**/*.html'),
      path.join(config.build.source, '**/*.xml'),
      path.join(config.build.source, '**/*.css'),
    ])
    .pipe(
      replace({
        manifest: manifest,
        replaceInExtensions: ['.html', '.xml', '.css'],
      }),
    )
    .pipe(gulp.dest(config.build.target))
})

gulp.task('minifyhtml', function(cb) {
  pump(
    [
      gulp.src(path.join(config.build.source, '**', '*.html')),
      htmlmin(config.htmlmin),
      gulp.dest(config.build.target),
    ],
    cb,
  )

  //   return gulp
  //     .src(path.join(config.build.source, '**', '*.html'))
  //     .pipe(htmlmin(config.htmlmin))
  //     .pipe(gulp.dest(config.build.target))
})
