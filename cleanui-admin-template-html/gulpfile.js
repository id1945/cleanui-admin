'use strict';

/*
 * CLEAN UI HTML ADMIN TEMPLATE GULP FILE
 */

/////////////////////////////////////////////////////////////////////////////
// CONFIGURATION

var appVars = {
  "templateName": "Clean UI Pro Html Admin Template",
  "title": "Clean UI Pro Html Admin Template",
  "version": "3.2.0",
  "description": "",
};

/////////////////////////////////////////////////////////////////////////////
// GULP PLUGINS

const gulp = require('gulp'),
  autoprefix = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  fileinclude = require('gulp-file-include'),
  ignore = require('gulp-ignore'),
  rimraf = require('gulp-rimraf'),
  browserSync = require('browser-sync').create(),
  wrap = require('gulp-wrap'),
  template = require('gulp-template'),
  data = require('gulp-data'),
  fs = require('fs'),
  flatten = require('gulp-flatten');

/////////////////////////////////////////////////////////////////////////////
// GULP PATHS

const path = {
  src: {
    versions: 'src/versions/',
    versionsFiles: 'src/versions/**/*.html',
    pages: 'src/pages/**/*.html',
    components: 'src/components/',
    componentsFiles: 'src/components/**/*.html',

    templates: 'src/components/**/**/*.html',
    img: 'src/components/**/img/**/*.*',
    css: 'src/components/**/*.scss',
    js: 'src/components/**/**/*.js',

    tmpPages: './dist/versions/tmp/pages/',
    tmpPagesFiles: './dist/versions/tmp/pages/**/*.html',
    tmpVersionsFiles: './dist/versions/tmp/versions/*.html',

    vendors_by_bower: 'src/vendors/by_bower/**/*.*',
    vendors_by_hands: 'src/vendors/by_hands/**/*.*'
  },
  build: {
    versions: './dist/versions/',
    tmpVersions: './dist/versions/tmp/',
    components: 'dist/components/',
    vendors: 'dist/vendors/',
  },
  clean: ['dist/*']
};

/////////////////////////////////////////////////////////////////////////////
// CLEAN PRODUCTION

function clean() {
  return gulp.src(path.clean) // get build folder
    .pipe(rimraf()); // erase all
}

/////////////////////////////////////////////////////////////////////////////
// PRINT ERRORS

function printError(error) {
  console.log(error.toString()); // print error
  this.emit('end'); // end task
}

/////////////////////////////////////////////////////////////////////////////
// BROWSERSYNC SERVE

function serve(cb) {
  browserSync.init({
    server: {
      baseDir: './dist/', // base dir path
      directory: true // show as directory
    },
    tunnel: false, // tunnel
    host: 'localhost', // host
    port: 9000, // port
    logPrefix: 'Frontend', // console log prefix
    notify: false,
  }); // run BrowserSync
  cb();
}

/////////////////////////////////////////////////////////////////////////////
// RELOAD BROWSER

function reload(cb) {
  browserSync.reload();
  cb();
}

/////////////////////////////////////////////////////////////////////////////
// BUILD PAGES

function buildVersions() {
  return gulp.src(path.src.versionsFiles) // get pages templates
    .pipe(ignore.exclude('**/head.html')) // exclude head.html file
    .pipe(fileinclude({ // include component templates to generated pages
      prefix: '@@',
      basepath: '@root'
    }))
    .pipe(gulp.dest(path.build.tmpVersions)) // copy generated pages to build folder
}

function buildPages(cb) {
  const versions = fs.readdirSync(path.src.versions).filter(function (e) { return e !== 'head.html' });
  const pages = versions.map(function (version) {
    const versionName = version.replace('.html', '');

    function buildVersionPages() {
      return gulp.src(path.src.pages)
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@root'
        }))
        .pipe(rename(function (path) {
          const prefix = path.dirname;
          path.dirname = "/";
          path.basename = prefix + '-' + path.basename;
        }))
        .pipe(data({
          templateName: appVars.templateName,
          title: appVars.title,
          productVersion: appVars.version
        })) // set variables
        .pipe(wrap({ src: `${path.build.tmpVersions}${version}` }))
        .pipe(template())
        .pipe(flatten())
        .pipe(gulp.dest(`${path.build.versions}${versionName}`))  // copy generated pages to build folder
    }

    buildVersionPages.displayName = `build ${versionName} pages`
    return buildVersionPages;
  });
  function removeTmp() {
    return gulp.src(path.build.tmpVersions) // get tmp folder
      .pipe(rimraf()); // erase tmp folder
  }
  return gulp.series(gulp.series(
    ...pages,
    removeTmp
  ),
    function doneBuildPages(done) {
      cb();
      done();
    })();
}

/////////////////////////////////////////////////////////////////////////////
// VENDORS BUILD

function buildVendors(cb) {
  gulp.src([path.src.vendors_by_bower, path.src.vendors_by_hands]) // get folders with vendors components
    .on('error', printError) // print error if found
    .pipe(gulp.dest(path.build.vendors)) // copy to destination folder
    .on('end', function () { browserSync.reload(); }) // reload BrowserSync
  cb();
}

/////////////////////////////////////////////////////////////////////////////
// JAVASCRIPT BUILD

function buildJs(cb) {
  gulp.src(path.src.js, { base: path.src.components }) // get folder with js
    .on('error', printError) // print error if found
    .pipe(gulp.dest(path.build.components)) // copy to destination folder
    .on('end', function () { browserSync.reload(); }) // reload BrowserSync
  cb();
}

/////////////////////////////////////////////////////////////////////////////
// STYLES BUILD

function buildCss(cb) {
  gulp.src(path.src.css, { base: path.src.components }) // get folder with css
    .pipe(ignore.exclude('**/mixins.scss')) // exclude mixins.scss file
    .pipe(sass({ outputStyle: 'expanded', indentWidth: 4 })) // css formatting
    .on('error', printError) // print error if found
    .pipe(autoprefix({
      cascade: true
    })) // add cross-browser prefixes
    .pipe(gulp.dest(path.build.components))  // copy sources
    .on('end', function () { browserSync.reload(); }) // reload BrowserSync
  cb();
}

/////////////////////////////////////////////////////////////////////////////
// IMAGES BUILD

function buildImg() {
  return gulp.src(path.src.img, { base: path.src.components }) // get folder with images
    .on('error', printError) // print error if found
    .pipe(gulp.dest(path.build.components)); // copy to destination folder
}

/////////////////////////////////////////////////////////////////////////////
// FILES CHANGE WATCHER

function watch(cb) {
  gulp.watch([path.src.versions, path.src.pages, path.src.templates, path.src.componentsFiles], gulp.series(buildVersions, buildPages, reload));
  gulp.watch([path.src.css], buildCss);
  gulp.watch([path.src.js], buildJs);
  gulp.watch([path.src.img], buildImg);
  gulp.watch([path.src.vendors_by_bower, path.src.vendors_by_hands], buildVendors);
  cb();
}

/////////////////////////////////////////////////////////////////////////////
// DECLARING TASKS

exports.clean = clean;
exports.serve = serve;
exports.buildCss = buildCss;
exports.buildJs = buildJs;
exports.buildImg = buildImg;
exports.buildVendors = buildVendors;
exports.buildPages = gulp.series(buildVersions, buildPages);
exports.watch = watch;

/////////////////////////////////////////////////////////////////////////////
// GLOBAL BUILD

exports.build = gulp.series(
  clean,
  gulp.parallel(gulp.series(buildVersions, buildPages), buildCss, buildJs, buildImg, buildVendors)
);

/////////////////////////////////////////////////////////////////////////////
// DEFAULT TASK

exports.default = gulp.series(
  clean,
  gulp.parallel(gulp.series(buildVersions, buildPages), buildCss, buildJs, buildImg, buildVendors),
  watch,
  serve
);
