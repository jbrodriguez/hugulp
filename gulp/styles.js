var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');

gulp.task('styles', function() {
    return gulp.src('src/styles/*.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        .pipe(cleancss({advanced:false}))
        .pipe(gulp.dest('staging/css'));
});
