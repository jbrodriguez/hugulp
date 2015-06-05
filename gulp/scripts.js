var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter("default"))   
        .pipe(uglify())
        .pipe(gulp.dest('staging/js'));
});
