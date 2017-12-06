// var gulp        = require("gulp");
// var browserSync = require("browser-sync");
// var watch 		= require("gulp-watch");

// gulp.task('serve', ['build:all'], function() {
//     // Serve files from the root of this project
//     browserSync({
//         server: {
//             baseDir: "./public/"
//         },
//         open: false
//     });

//     watch(['layouts/**/*', 'content/**/*', 'archetypes/**/*'], {}, function handle() {
// 		gulp.start('build:content');
// 	});

//     watch(['assets/styles/**/*.scss', 'assets/styles/**/*.less', 'assets/styles/**/*.css', 'assets/scripts/**/*.js', 'assets/img/**/*.*', 'assets/svg/**/*.svg'], {}, function handle() {
// 		gulp.start('build:all');
// 	});
// });
// system
const fs = require('fs')
const path = require('path')

// parameters
const config = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), '.hugulprc')),
)

// common
const gulp = require('gulp')
const watch = require('gulp-watch')

// styles
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleancss = require('gulp-clean-css')
const less = require('gulp-less')
const merge = require('merge-stream')
const concat = require('gulp-concat')

gulp.task('watch', function() {
  watch(
    [
      path.join(config.watch.source, config.path.styles, '**/*.s[a|c]ss'),
      path.join(config.watch.source, config.path.styles, '**/*.less'),
      path.join(config.watch.source, config.path.styles, '**/*.css'),
    ],
    {},
    function handle() {
      gulp.start('styles')
    },
  )
})

gulp.task('styles', function() {
  const lessStream = gulp
    .src(path.join(config.watch.source, config.path.styles, '**/*.less')) // i.e.: public/styles/**/*.less
    .pipe(less())
    .pipe(concat('less-files.css'))

  const scssStream = gulp
    .src(path.join(config.watch.source, config.path.styles, '**/*.s[a|c]ss')) // i.e.: public/styles/**/*.s[a|c]ss
    .pipe(sass())
    .pipe(concat('scss-files.css'))

  const cssStream = gulp
    .src(path.join(config.watch.source, config.path.styles, '**/*.css')) // i.e.: public/styles/**/*.css
    .pipe(concat('css-files.css'))

  return merge(lessStream, scssStream, cssStream)
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(cleancss(config.cleancss))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(path.join(config.watch.target, config.path.styles)))
})
