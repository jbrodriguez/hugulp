var gulp = require('gulp');

// SVG optimization task
gulp.task('svg', function () {
  return gulp.src('assets/svg/*.svg')
//    .pipe(svgmin())
    .pipe(gulp.dest('staging/img'));
});
