// Sets up Express.js Node Server
var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');

// Read .env config variables
require('dotenv').config({silent: true});

// Babel ES6/JSX Compiler
require('babel-register');

// JS templating engine - http://paularmstrong.github.io/swig/
var swig  = require('swig');

// React 
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var Iso = require('iso');
var routes = require('./src/routes');
var alt = require('./src/js/alt');

// Configure `app` as express instance
var ip = '0.0.0.0';
var port = 8080;
var app = express();

app.use(logger('dev'))
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname,'src/views'));
app.set('env', process.env.NODE_ENV || "development");
app.use(express.static(path.join(__dirname,'public')));
app.use(favicon(__dirname + '/public/assets/favicon.ico'));
app.use(require('connect-livereload')());

/*
  Example fire when url is /pure
  Appennds data to the locals var, which is bootstrapped to the alt instance and passed to the stores on client.js
*/
app.get('/pure', function(req, res, next){
  
  res.locals.data = {
    ExampleStore: {
      examples : [
        {
          "id" : 9999,
          "name" : "From the Server :)"
        }
      ]
    }
  }
  next();

});



/*
  Serves page data based on React Router 
*/
app.use(function(req, res) {
  
  // We take the locals data we have fetched and seed our stores with data
  alt.bootstrap(JSON.stringify(res.locals.data || {}));

  // Create a new instance of iso to pass data down to server
  var iso = new Iso.default();

  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      
      // Compile correct components based on routing context. defined in ./src/routes
      // `renderToString` will render React Components to a string that client.js can rehydrate
      var content = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      
      // Add the content to Iso, and call flush -- take a snapshot, render the data, and reset your stores so they are ready for the next request.
      // 1. https://github.com/goatslacker/alt#alt-features
      // 2. https://github.com/goatslacker/iso
      iso.add(content, alt.flush());
      // Render to swig HTML template
      res.render('index', { html: iso.render(), NODE_ENV: app.get('env') });

    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.listen(port, ip, function(){
  console.log('Express listening on ' + ip + ':' + port);
});