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
    gulp.watch(['hugo/layouts/**/*', 'hugo/content/**/*', 'hugo/archetypes/**/*'], ['build:content']);
    gulp.watch(['src/styles/*.scss', 'src/scripts/*.js', 'src/img/*.*', 'src/svg/*.svg'], ['build:all']);
});
