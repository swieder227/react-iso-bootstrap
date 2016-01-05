var gulp = require("gulp");
var connect = require("gulp-connect");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var watchify = require("watchify");
var browserify = require("browserify");
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var notify = require('gulp-notify');

var PATH = {
  HTML_SRC : "./index.html",
  SCSS_SRC : ["src/scss/*.scss", "src/components/**/*.scss"],
  SCSS_OUT : "public",
  JS_OUT_DEV : "public",
}

// Create a server at the Dev build location
gulp.task("connectDev", function(){
  connect.server({
    root: "./",
    port: 8000,
    livereload: true
  })
});

// Copy src HTML to Dev and update livereload
// gulp.task("htmlDev", function(){
//   gulp.src(PATH.HTML_SRC)
//     .pipe(gulp.dest(PATH.HTML_OUT_DEV))
//     .pipe(connect.reload());
// });

// Compile Sass and update livereload
gulp.task('scssDev', function(){
  gulp.src(PATH.SCSS_SRC)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PATH.SCSS_OUT))
    .pipe(connect.reload());
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('bundleDev', function(){
  
  // browserify will look at all moudle.exports and requires(), starting at 'entries' and concat files with correct dependencies
  // watchify is a cache/performance layer around browserify
  var watcher  = watchify(browserify({
    entries: ["./src/app.jsx"],
    transform: babelify.configure({ presets: ["es2015", "stage-0", "react"] }),
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));
  
  // use above configuration in a watch mode. 
  // also bundle once start-up.
  return watcher.on('update', function () {
    watcher.bundle()
      .on('error', handleErrors)
      .pipe(source("build.js"))
      .pipe(gulp.dest(PATH.JS_OUT_DEV))
      .pipe(connect.reload());
      gutil.log("Finished", gutil.colors.cyan("'bundleDev update'"), "@", gutil.colors.green(PATH.JS_OUT_DEV))
  })
  .bundle()
  .pipe(source("build.js"))
  .pipe(gulp.dest(PATH.JS_OUT_DEV))
  .pipe(connect.reload());
});


// Watch files, run task when modified.
gulp.task("watchDev", function(){
  
  // When src HTML changes, update dev HTML
  // gulp.watch([PATH.HTML_SRC], ["htmlDev"]);

  // When scss changes, re-compile
  gulp.watch(PATH.SCSS_SRC, ['scssDev']);

});

gulp.task('default', ['connectDev', "watchDev", "bundleDev"]);

