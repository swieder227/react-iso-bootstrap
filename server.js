var express = require('express');
var path = require('path');
var logger = require('morgan');

// Babel ES6/JSX Compiler
require('babel-register');
// JS templating engine - http://paularmstrong.github.io/swig/
var swig  = require('swig');

var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var Iso = require('iso');
var routes = require('./src/routes');

var app = express();

app.set('port', 3000);
app.use(logger('dev'));
app.use(express.static(path.join(__dirname,'public')));

app.use(function(req, res) {
  
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('./src/views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.listen(app.get('port'), function(){
  console.log('Express listening on port ' + app.get('port'));
})