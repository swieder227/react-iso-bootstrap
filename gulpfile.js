var gulp = require("gulp");
var watch = require("gulp-watch");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require('gulp-autoprefixer');
var concat = require("gulp-concat");
var watchify = require("watchify");
var browserify = require("browserify");
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var nodemon = require('nodemon');
var livereload = require('gulp-livereload');

var PATH = {
  SCSS_SRC : ["src/scss/*.scss", "src/components/**/*.scss"],
  SCSS_OUT_DEV : "public/dev",
  SCSS_OUT_PROD : "public/dist",
  CSS_NAME_DEV : 'styles.css',
  CSS_NAME_PROD : 'styles.min.css',
  JS_OUT_DEV : "public/dev",
  JS_OUT_PROD : "public/dist",
  JS_NAME_DEV : 'build.js',
  JS_NAME_PROD : 'build.min.js',
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

// Compile Sass and update livereload
gulp.task('scssDev', function(){
  gulp.src(PATH.SCSS_SRC)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat(PATH.CSS_NAME_DEV))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PATH.SCSS_OUT_DEV))
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}


// browserify will look at all module.exports and requires(), starting at 'entries' and concat files with correct dependencies
// watchify is a cache/performance layer around browserify
var watcher  = watchify(browserify({
  entries: ["./client.js"],
  transform: babelify.configure(
              { 
                presets: ["es2015", "react"],
                plugins: ["transform-class-properties"]
              }),
  extensions: ['.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

gulp.task('bundleDev', function(){

  // use above configuration in a watch mode. 
  // also bundle once start-up.
  return watcher.on('update', function () {
    watcher.bundle()
      .on('error', handleErrors)
      .pipe(source(PATH.JS_NAME_DEV))
      .pipe(gulp.dest(PATH.JS_OUT_DEV));
      gutil.log("Finished", gutil.colors.cyan("'bundleDev update'"), "@", gutil.colors.green(PATH.JS_OUT_DEV))
  })
  .bundle()
  .on('error', handleErrors)
  .pipe(source(PATH.JS_NAME_DEV))
  .pipe(gulp.dest(PATH.JS_OUT_DEV));
});


// Watch files, run task when modified.
gulp.task("watchDev", function(){

  // When scss changes, re-compile
  watch(PATH.SCSS_SRC, function(event){
    gulp.start('scssDev');
  });
  
});

gulp.task('buildProd', function(){
  
  // scss: compress, autoprefix, concat
  gulp.src(PATH.SCSS_SRC)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat(PATH.CSS_NAME_PROD))
    .pipe(gulp.dest(PATH.SCSS_OUT_PROD))

  // js: bundle, compile, concat
  browserify({
    entries: ["./client.js"],
    transform: babelify.configure(
                { 
                  presets: ["es2015", "react"],
                  plugins: ["transform-class-properties"]
                }),
    extensions: ['.jsx'],
    debug: false,
    fullPaths: false
  })
  .bundle()
  .on('error', handleErrors)
  .pipe(source(PATH.JS_NAME_PROD))
  .pipe(streamify(uglify()))
  .pipe(gulp.dest(PATH.JS_OUT_PROD));

});

gulp.task('default', ["connectDev", "scssDev", "watchDev", "bundleDev"]);
