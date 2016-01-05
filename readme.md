# React Bootstrap. A scaffold for __HTML + ReactJS__ Isomorphic Single-Page Applications.

Hit the ground running and immediately start building in React!

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

### Notes on How Isomorphic Works:
Isomorphic Web-Apps can run both server-side and client-side, while sharing the same codebase. The code is pre-rendered and delivered as HTML, where the client can pick back up and continue running the application.
###### In our case:
1. **gulp** runs a **node** server at `./server.js`.  
2. Request is processed and **react-router**, shared between client & server, decides correct React component to render.
3. **ReactDOM/server** method **renderToString()** coverts the React component to an HTML string.
4. **Iso** ([an isomorphic Alt helper library]((https://github.com/goatslacker/iso))) assists in passing on the data server-side.
5. Final HTML is rendered to a **swig** template and sent to client.
6. **Iso** bootstraps the passed down data and re-hydrates the client-side React components.

### Todo:
* Create Prod build process

#### Resources: 
* [React on ES6+](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/)
* [Alt.js Guide](http://alt.js.org/guide/)

