const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleancss = require('gulp-clean-css')
const less = require('gulp-less')
const merge = require('merge-stream')
const concat = require('gulp-concat')

gulp.task('styles', function () {
  const lessStream = gulp.src('assets/styles/**/*.less')
    .pipe(less())
    .pipe(concat('less-files.css'))

	const scssStream = gulp.src('assets/styles/**/*.s[a|c]ss')
	    .pipe(sass())
	    .pipe(concat('scss-files.css'));

  const cssStream = gulp.src('assets/styles/**/*.css')
    .pipe(concat('css-files.css'))

  return merge(lessStream, scssStream, cssStream)
        .pipe(autoprefixer('last 2 version')) // can we make this configurable?
        .pipe(cleancss({advanced: false})) // can we make this configurable?
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('staging/css'))
})
