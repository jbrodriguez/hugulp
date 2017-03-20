var gulp        = require("gulp");
var browserSync = require("browser-sync");

gulp.task('serve', ['build:all'], function() {
    // Serve files from the root of this project
    browserSync({
        server: {
            baseDir: "./public/"
        },
        open: false
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch(['layouts/**/*', 'content/**/*', 'archetypes/**/*'], ['build:content']);
    gulp.watch(['assets/styles/**/*.scss', 'assets/styles/**/*.less', 'assets/styles/**/*.css', 'assets/scripts/**/*.js', 'assets/img/**/*.*', 'assets/svg/**/*.svg'], ['build:all']);
});
