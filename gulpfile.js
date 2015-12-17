var gulp = require("gulp");
var connect = require("gulp-connect");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");


var PATH = {
  HTML_SRC : "./src/index.html",
  HTML_OUT_DEV : "./dist/dev",
  SCSS_SRC : ["./src/scss/*.scss", "./src/components/**/*.scss"]
}

// Create a server at the Dev build location
gulp.task("connectDev", function(){
  connect.server({
    root: PATH.HTML_OUT_DEV,
    port: 8000,
    livereload: true
  })
});

// Copy src HTML to Dev and update livereload
gulp.task("htmlDev", function(){
  gulp.src(PATH.HTML_SRC)
    .pipe(gulp.dest(PATH.HTML_OUT_DEV))
    .pipe(connect.reload());
});

// Compile Sass and update livereload
gulp.task('scssDev', function(){
  gulp.src(PATH.SCSS_SRC)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist/dev/css"))
    .pipe(connect.reload());
});

// Watch files, run task when modified.
gulp.task("watchDev", function(){
  
  // When src HTML changes, update dev HTML
  gulp.watch([PATH.HTML_SRC], ["htmlDev"]);

  // When scss changes, re-compile
  gulp.watch(PATH.SCSS_SRC, ['scssDev']);

});

gulp.task('default', ['connectDev', "watchDev"]);

