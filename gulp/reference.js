const gulp = require('gulp')
const replace = require('gulp-rev-replace')
const size = require('gulp-size')

gulp.task('reference:content', ['hugo:draft'], function () {
  const manifest = gulp.src('public/rev-manifest.json')

  return gulp.src(['public/**/*.html', 'public/**/*.xml', 'public/**/*.css'])
    .pipe(replace({manifest: manifest}))
    .pipe(size())
    .pipe(gulp.dest('public'))
})

gulp.task('reference:all', ['hugo:all'], function () {
  const manifest = gulp.src('public/rev-manifest.json')

  return gulp.src(['public/**/*.html', 'public/**/*.xml', 'public/**/*.css'])
    .pipe(replace({manifest: manifest, replaceInExtensions: ['.html', '.xml', '.css']}))
    .pipe(size())
    .pipe(gulp.dest('public'))
})

gulp.task('reference:publish', ['hugo:live'], function () {
  const manifest = gulp.src('public/rev-manifest.json')

  return gulp.src(['public/**/*.html', 'public/**/*.xml', 'public/**/*.css'])
    .pipe(replace({manifest: manifest, replaceInExtensions: ['.html', '.xml', '.css']}))
    .pipe(size())
    .pipe(gulp.dest('public'))
})
