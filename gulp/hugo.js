const gulp = require('gulp')
const exec = require('child_process').execSync
const gutil = require('gulp-util')
const path = require('path')
const del = require('del')

function hugo (drafts) {
  const src = process.cwd()
  const dst = path.join(process.cwd(), 'public')

  gutil.log('src: ' + src + ' dst: ' + dst)

  let conf = 'config.toml'
  let opt, i = process.argv.indexOf('--config') // Adjust to standard
  if (i > -1) {
    conf = process.argv[i + 1]
  }  else {
    opt, i = process.argv.indexOf('-c') // Adjust to standard
    if (i > -1) {
      conf = process.argv[i + 1]
    }
  }

  let cmd = 'hugo --config=' + conf + ' -s ' + src + ' -d ' + dst
  if (drafts) {
    cmd += ' --buildDrafts=true --verbose=true --baseUrl="http://localhost:3000/" '
  }
  const result = exec(cmd, {encoding: 'utf-8'})
  gutil.log('hugo: \n' + result)
}

gulp.task('hugo:draft', function () {
  hugo(true)
})

gulp.task('hugo:all', ['hugo:delete'], function () {
  hugo(true)
})

gulp.task('hugo:delete', ['revision'], function () {
  const dst1 = path.join(process.cwd(), 'public')
  del.sync(dst1)
})

gulp.task('hugo:live', ['hugo:delete'], function () {
  hugo(false)
})
