var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var less = require('gulp-less');
var merge = require('merge-stream');
var concat = require('gulp-concat');

gulp.task('styles', function() {
	var lessStream = gulp.src('assets/styles/**/*.less')
	    .pipe(less())
	    .pipe(concat('less-files.css'));

	var scssStream = gulp.src('assets/styles/**/*.s[a|c]ss')
	    .pipe(sass())
	    .pipe(concat('scss-files.css'));

	var cssStream = gulp.src('assets/styles/**/*.css')
	    .pipe(concat('css-files.css'));

    return merge(lessStream, scssStream, cssStream)
        .pipe(autoprefixer('last 2 version'))
        .pipe(cleancss({advanced:false}))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('staging/css'));

});
