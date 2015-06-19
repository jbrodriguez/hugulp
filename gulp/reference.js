var gulp = require("gulp");
var replace = require("gulp-rev-replace");
var size = require('gulp-size');

gulp.task('reference:content', ['hugo:draft'], function() {
    var manifest = gulp.src('public/rev-manifest.json');

    return gulp.src(['public/**/*.html', 'public/**/*.xml', 'public/**/*.css'])
        .pipe(replace({manifest: manifest}))
        .pipe(size())
        .pipe(gulp.dest('public'));
});

gulp.task('reference:all', ['hugo:all'], function() {
    var manifest = gulp.src('public/rev-manifest.json');

    return gulp.src(['public/**/*.html', 'public/**/*.xml', 'public/**/*.css'])
        .pipe(replace({manifest: manifest, replaceInExtensions: ['.html', '.xml', '.css']}))
        .pipe(size())
        .pipe(gulp.dest('public'));
});

gulp.task('reference:publish', ['hugo:live'], function() {
    var manifest = gulp.src('public/rev-manifest.json');

    return gulp.src(['public/**/*.html', 'public/**/*.xml', 'public/**/*.css'])
        .pipe(replace({manifest: manifest, replaceInExtensions: ['.html', '.xml', '.css']}))
        .pipe(size())
        .pipe(gulp.dest('public'));
});
