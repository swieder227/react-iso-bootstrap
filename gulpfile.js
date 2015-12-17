var gulp = require("gulp");
var connect = require("gulp-connect");


var PATH = {
  HTML_SRC : "./src/index.html",
  HTML_OUT_DEV : "./dist/dev"
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

// Watch files, run task when modified.
gulp.task("watchDev", function(){
  
  // When src HTML changes, update dev HTML
  gulp.watch([PATH.HTML_SRC], ["htmlDev"]);


});

gulp.task('default', ['connectDev', "watchDev"]);