hugulp
======

hugulp is a tool to optimize the assets of a [Hugo](http://gohugo.io) website.

The main idea is to recreate the famous [Ruby on Rails Asset Pipeline](http://guides.rubyonrails.org/asset_pipeline.html), which minifies, concatenates and fingerprints the assets used in your website.

This leads to less and smaller network requests to your page, improving overall user experience.

Read [this blog post](http://jbrodriguez.io/mobile-friendly-website-2/) and [this article](https://medium.com/@juanbrodriguez/hugulp-a-hugo-gulp-toolchain-94f72ccc3577) for additional context.

It's internally driven by [Gulp](http://gulpjs.com).

This project Includes the following tools, tasks and workflows:

- [BrowserSync](http://www.browsersync.io/)
- [SASS](http://sass-lang.com/) (super fast libsass)
- [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)
- [ClearCss](https://github.com/scniro/gulp-clean-css)
- [Javascript Lint](https://github.com/spalger/gulp-jshint)
- [Uglify](https://github.com/terinjokes/gulp-uglify)
- [Image optimization](https://github.com/sindresorhus/gulp-imagemin) (only [changed images](https://github.com/sindresorhus/gulp-changed))
- Asset Fingerprinting using [gulp-rev](https://github.com/sindresorhus/gulp-rev) and [gulp-rev-replace](https://github.com/jamesknelson/gulp-rev-replace)

## Installation
[Node](https://nodejs.org) needs to be installed in your system.

Then just

```bash
$ npm install -g hugulp
```

## Getting Started
*hugulp* requires you to create the following folders inside your hugo site:

- assets/img
- assets/styles
- assets/scripts

For example

```bash
$ hugo new site website
$ cd website
$ mkdir -p assets/{img,styles,scripts}
# create content, add images, css/sass and javascript files to the corresponding folders>
$ hugulp build
```

It will use hugo's default config file: config.toml, but you can specify a
different config via the -c, --config switch

```bash
$ hugulp build --config config.yaml
```

Or

```bash
$ hugulp watch --config config.yaml
```

## Available Commands

### hugulp watch
It will do the following:
1. Process files based on their location, according to the following table

| In Folder | Looks for  | Operation |
| ------ | :-----: | --------- |
| assets/styles | scss, less, css | Convert sass/less to css, then minify the result |
| assets/img | * | Compress changed images |
| assets/scripts | js | Minify javascript code |
*Note: It searches the folders recursively*

2. Fingerprint the optimized assets from the previous step
3. Invoke hugo to generate the site

hugo will be invoked like this:
```bash
$ hugo --config=config.toml -s . -d ./public --buildDrafts=true --verbose=true --baseUrl="http://localhost:3000/"
```

4. Change all references to the assets in your content files (index.html, etc.)
5. Watch for changes to content files or assets to reload the browser

### hugulp build
It runs the same pipeline as the hugulp build command, but hugo is invoked as
follows:

```bash
$ hugo --config=config.toml -s . -d ./public"
```

Additionally, files are not watched for changes

## How to update
Whenever a new *hugulp* version becomes available, you can update it by running
```bash
$ npm update -g hugulp
```

## PR
Pull Requests are welcome :thumbsup:.


## Share
Made by [Juan B. Rodriguez](http://jbrodriguez.io), with a MIT License.

Please [share the article or leave your comments](http://jbrodriguez.io/mobile-friendly-website-2/).
