hugulp
======

hugulp is a starter project for [Hugo](http://gohugo.io) + [Gulp](http://gulpjs.com).

It combines Hugo's fast static site generation with Gulp's flexibility to manage an asset pipeline and control the build process.

Read [this article](http://jbrodriguez.io/mobile-friendly-website-2/), for additional context.

Includes the following tools, tasks and workflows:

- [BrowserSync](http://www.browsersync.io/)
- [SASS](http://sass-lang.com/) (super fast libsass)
- [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)
- [MinifyCss](https://github.com/jonathanepollack/gulp-minify-css)
- [Javascript Lint](https://github.com/spalger/gulp-jshint)
- [Uglify](https://github.com/terinjokes/gulp-uglify)
- [Image optimization](https://github.com/sindresorhus/gulp-imagemin) (only [changed images](https://github.com/sindresorhus/gulp-changed))
- Asset Fingerprinting using [gulp-rev](https://github.com/sindresorhus/gulp-rev) and [gulp-rev-replace](https://github.com/jamesknelson/gulp-rev-replace)


## Install Hugo
[Follow the instructions](http://gohugo.io/#action).

If Hugo is already installed, copy the folders in its current location to the hugo folder of this project.

Also, copy the following folders:
- hugo/static/img to src/img
- hugo/static/css to src/styles
- hugo/static/js to src/scripts
- any svg files to src/svg

## Install Node
[Follow the instructions](https://nodejs.org)

If Node is already installed, no further action is required.

## Install npm dependencies
```
$ npm install
```

This runs through all dependencies listed in `package.json` and downloads them to a `node_modules` folder in your project directory.

## Run gulp
Run the `default` gulp task with

```
$ gulp
```

It will do the following:
- The **styles**, **scripts** and **images** tasks get executed first to do the heavy lifting of compressing images and minifying css/js files.
- The **revision** task runs next to fingerprint the optimized assets.
- Then the **hugo:all** task is invoked to generate the static site<br>
hugo will run as if invoked like this:
```
$ hugo --config=./hugo/config.yaml -s ./hugo -d ./public --buildDrafts=true --verbose=true --baseUrl="http://localhost:3000/"
```

- The **reference:all** task replaces all asset ocurrences with their fingerprinted versions
- Finally, the browser is reloaded so that you can very quickly check the changes you made

## Publish step
There's also a `publish` task you can run:

```
$ gulp publish
```

It will perform all the steps above, but Hugo will be run with as follows:
```
$ hugo --config=./hugo/config.yaml -s ./hugo -d ./public"
```

## PR
For changes, send a PR.


## Share
Made by [Juan B. Rodriguez](http://jbrodriguez.io), with a MIT License.

Please [share the article or leave your comments](http://jbrodriguez.io/mobile-friendly-website-2/).