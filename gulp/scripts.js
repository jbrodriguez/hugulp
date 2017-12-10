const gulp = require('gulp')
const jshint = require('gulp-jshint')
const uglify = require('gulp-uglify')

gulp.task('scripts', function () {
  return gulp.src('assets/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(gulp.dest('staging/js'))
})
