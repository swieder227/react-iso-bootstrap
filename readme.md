# React Bootstrap. A scaffold for __HTML + ReactJS__ Single-Page Applications.

**Branched specifically for client-side only implementations.**

### Toolset:
1. [ReactJS](https://facebook.github.io/react/) - Component-based javascript framework for building UI's
2. [Alt](http://alt.js.org/) - Robust implementaiton of the [Flux Application Architecure](https://facebook.github.io/flux/docs/overview.html)
3. [Sass](http://sass-lang.com/) - CSS Preprocessor for extended functionality
4. [Browserify](http://browserify.org/) - Dependency management across javascript files
5. [Babel](https://babeljs.io/) - ES6+ javascript transpiler
6. [Gulp](http://gulpjs.com/) - Build process and automation tool

### Build Process:
1. Confirm that you have latest npm (install via NodeJS if necessary)
2. Run `npm install` to download dependencies
3. From the root directory, run `gulp`
4. Work on source files in `./src`, and compiled files will be put in `./dist`.

Now you should be running a webserver with livereload, and a watcher build task that compiles scss and js on save.

### Todo:
* Research server-side rendering
* Create Prod build process

#### Resources: 
* [React on ES6+](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/)
* [Alt.js Guide](http://alt.js.org/guide/)

