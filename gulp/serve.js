var gulp        = require("gulp");
var browserSync = require("browser-sync");
var watch 		= require("gulp-watch");

gulp.task('serve', ['build:all'], function() {
    // Serve files from the root of this project
    browserSync({
        server: {
            baseDir: "./public/"
        },
        open: false
    });

    watch(['layouts/**/*', 'content/**/*', 'archetypes/**/*'], {}, function handle() {
		gulp.start('build:content');
	});

    watch(['assets/styles/**/*.scss', 'assets/styles/**/*.less', 'assets/styles/**/*.css', 'assets/scripts/**/*.js', 'assets/img/**/*.*', 'assets/svg/**/*.svg'], {}, function handle() {
		gulp.start('build:all');
	});
});
