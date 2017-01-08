var gulp = require('gulp');
var rev = require('gulp-rev');
var del = require('rev-del');
var path = require('path');

gulp.task('revision', ['styles','scripts', 'images', 'svg'], function() {
    return gulp.src(['staging/css/*.css', 'staging/js/*.js', 'staging/img/*.*', 'staging/svg/*.svg'], {base: path.join(process.cwd(), 'staging')})
        .pipe(rev())
        .pipe(gulp.dest('static'))
        .pipe(rev.manifest())
        .pipe(del({dest: 'static'}))       
        .pipe(gulp.dest('static'));
});
