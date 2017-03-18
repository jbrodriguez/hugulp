var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');

gulp.task('images', function () {
  return gulp.src('assets/img/**/*.*')
    .pipe(changed('staging/img'))
    .pipe(imagemin())
    .pipe(gulp.dest('staging/img'));
});
