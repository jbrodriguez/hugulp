const gulp = require('gulp')
const rev = require('gulp-rev')
const del = require('rev-del')
const path = require('path')

gulp.task('revision', ['styles', 'scripts', 'images', 'svg'], function () {
  return gulp.src(['staging/css/**/*.css', 'staging/js/**/*.js', 'staging/img/**/*.*', 'staging/svg/**/*.svg'], {base: path.join(process.cwd(), 'staging')})
    .pipe(rev())
    .pipe(gulp.dest('static'))
    .pipe(rev.manifest())
    .pipe(del({dest: 'static'}))
    .pipe(gulp.dest('static'))
})
