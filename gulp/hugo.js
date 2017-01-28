var gulp = require('gulp');
var exec = require('child_process').execSync;
var gutil = require('gulp-util');
var path = require('path');
var del = require('del');

function hugo(drafts) {
    var src = process.cwd();
    var dst = path.join(process.cwd(), 'public');

    gutil.log('src: ' + src + ' dst: ' + dst);

	var conf = 'config.toml'
	var opt, i = process.argv.indexOf("--config");
	if (i > -1) {
	    conf = process.argv[i+1];
	} else {
		opt, i = process.argv.indexOf("-c");
		if (i > -1) {
			conf = process.argv[i+1];
		}
	}
	// console.log('conf %s', conf)

    var cmd = 'hugo --config=' + conf + ' -s ' + src + ' -d ' + dst;
    if (drafts) {
        cmd += ' --buildDrafts=true --verbose=true --baseUrl="http://localhost:3000/" ';
    }

    var result = exec(cmd, {encoding: 'utf-8'});
    gutil.log('hugo: \n' + result);
}

gulp.task('hugo:draft', function() {
    hugo(true);
});

gulp.task('hugo:all', ['hugo:delete'], function() {
    hugo(true);
});

gulp.task('hugo:delete', ['revision'], function() {
    var dst1 = path.join(process.cwd(), 'public');
    // var dst2 = path.join(process.cwd(), 'hugo', 'public');
    del.sync(dst1);
    // del.sync(dst2);
});

gulp.task('hugo:live', ['hugo:delete'], function() {
    hugo(false);
});
