const gulp = require('gulp')
const browserSync = require('browser-sync')
const watch = require('gulp-watch')

const assets = [
  'assets/styles/**/*.scss',
  'assets/styles/**/*.less',
  'assets/styles/**/*.css',
  'assets/scripts/**/*.js',
  'assets/img/**/*.*',
  'assets/svg/**/*.svg'
]

const content = [
  'layouts/**/*',
  'content/**/*',
  'archetypes/**/*'
]

gulp.task('serve', ['build:all'], function () {
    // Serve files from the root of this project
  browserSync({
    server: {
      baseDir: './public/'
    },
    open: false
  })

  watch(content, {}, function handle () {
    gulp.start('build:content')
  })

  watch(assets, {}, function handle () {
    gulp.start('build:all')
  })
})
