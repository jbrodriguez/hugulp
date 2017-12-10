const gulp = require('gulp')
const reload = require('browser-sync').reload

gulp.task('build:content', ['reference:content'], reload)

gulp.task('build:all', ['reference:all'], reload)

gulp.task('build:publish', ['reference:publish'])
