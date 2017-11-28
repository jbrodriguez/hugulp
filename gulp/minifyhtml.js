var gulp = require('gulp')
var htmlmin = require('gulp-htmlmin')

gulp.task('minifyhtml:minifyhtml', function () {
  return gulp.src('public/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeEmptyElements: true}))
    .pipe(gulp.dest('public/'))
})
