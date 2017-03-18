var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var less = require('gulp-less');
var merge = require('merge-stream');
var concat = require('gulp-concat');

var lessStream = gulp.src(['assets/styles/**/*.less'])
    .pipe(less())
    .pipe(concat('less-files.less'));

var scssStream = gulp.src(['assets/styles/**/*.scss'])
    .pipe(sass())
    .pipe(concat('scss-files.scss'));

var cssStream = gulp.src(['assets/styles/**/*.css'])
    .pipe(concat('css-files.css'));

gulp.task('styles', function() {
    return merge(lessStream, scssStream, cssStream)
        .pipe(autoprefixer('last 2 version'))
        .pipe(cleancss({advanced:false}))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('staging/css'));

});
