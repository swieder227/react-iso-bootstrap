var gulp = require("gulp");
var watch = require("gulp-watch");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var watchify = require("watchify");
var browserify = require("browserify");
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var nodemon = require('nodemon');
var livereload = require('gulp-livereload');

var PATH = {
  HTML_SRC : "src/index.html",
  HTML_OUT_DEV : "public",
  SCSS_SRC : ["src/scss/*.scss", "src/components/**/*.scss"],
  SCSS_OUT : "public",
  JS_OUT_DEV : "public",
}

// Create a server at the Dev build location
// script: entry point
// ext: files to watch and restart if changed
gulp.task("connectDev", ["scssDev", "watchDev", "bundleDev"], function(){
  livereload.listen();
  nodemon({
    script: 'server.js',
    ext: 'html css js',
    stdout: false
  })
  .on('start', function() {
    gutil.log("Starting", gutil.colors.green("Nodemon"));
  })
  .on('readable', function() {
    
    // If there's an error, output to console
    this.stderr.on('data', function(chunk) {
      process.stderr.write(chunk);
    });

    // we check the server's stdout string output by server.js:app.listen()
    // once that is sent, call reload and then output the text
    this.stdout.on('data', function(chunk) {
      if (/Express listening/.test(chunk)) {
        livereload.reload("server.js");
      }
      process.stdout.write(chunk)
    })
  });
});

// Copy src HTML to Dev and update livereload
gulp.task("htmlDev", function(){
  gulp.src(PATH.HTML_SRC)
    .pipe(gulp.dest(PATH.HTML_OUT_DEV));
});

// Compile Sass and update livereload
gulp.task('scssDev', function(){
  gulp.src(PATH.SCSS_SRC)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PATH.SCSS_OUT))
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
    entries: ["./client.js"],
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
      .pipe(gulp.dest(PATH.JS_OUT_DEV));
      gutil.log("Finished", gutil.colors.cyan("'bundleDev update'"), "@", gutil.colors.green(PATH.JS_OUT_DEV))
  })
  .bundle()
  .pipe(source("build.js"))
  .pipe(gulp.dest(PATH.JS_OUT_DEV));
});


// Watch files, run task when modified.
gulp.task("watchDev", function(){
  
  // When src HTML changes, update dev HTML
  watch(PATH.HTML_SRC, function(event){
    gulp.start('htmlDev');
  });

  // When scss changes, re-compile
  watch(PATH.SCSS_SRC, function(event){
    gulp.start('scssDev');
  });
  

});

gulp.task('default', ["connectDev", "scssDev", "watchDev", "bundleDev"]);

