# React Bootstrap. 
## A scaffold for __ReactJS__ Isomorphic Single-Page Applications.

Immediately start building with server-side ReactJS!

### Toolset:
1. [ReactJS](https://facebook.github.io/react/) - Component-based javascript framework for building UI's
2. [Alt](http://alt.js.org/) - Robust implementaiton of the [Flux Application Architecure](https://facebook.github.io/flux/docs/overview.html)
3. [Sass](http://sass-lang.com/) - CSS Preprocessor for extended functionality
4. [Browserify](http://browserify.org/) - Dependency management across javascript files
5. [Babel](https://babeljs.io/) - ES6+ javascript transpiler
6. [Gulp](http://gulpjs.com/) - Build process and automation tool

### Dev Process:

This how to instantiate the project and run the automation tools on OS X.

1. Confirm that you have latest npm (run `npm -v`, if it says not found then install via [NodeJS](https://nodejs.org/en/download/))
2. From the root directory, run `npm install` to download dependencies
3. Confirm that you have gulp installed on your command line (run `gulp`, if not found run `npm install -g gulp`)
4. If installed, running `gulp` from the root directly will run the default task to setup a webserver with livereload, and a watcher build task that compiles scss and js on save.
5. Source files are in `/` and `./src`, and compiled files will be put in `./public`

Now you're up and ready to begin coding! There are a few demos in `./src/components/ExampleComponent`.

### Configuring Environment:
We're reading a file called `.env` from the root of the project. This file is purposely ignored by git because it contains variables specific to the environment. If the file is not found, or properties are omitted, a default value should be supplied.

Current options:

- **NODE_ENV**: Dictates which files to serve, public/dev or public/dist. E.g. "production". Default: "development". 

The syntax is [documented here](https://www.npmjs.com/package/dotenv):

    NODE_ENV="production"

### Production Build:
Run the task `gulp buildProd` to generate production-ready css + jss in `./public/dist`.

See _Configuring Environment_ for how to change the `NODE_ENV` variable between "development" || "production", that affects which files are included in the swig template in `./src/views`.

See _Deploying to a Node server on Ubuntu 14.04 Trusty_ for how to setup and deploy to a server.

### Disclaimer for User-Facing Projects:
This bootstrap is setup to transpile next generation ES6+ javascript syntax to browser-supported ES5+ syntax, including experimental features by default. If you're building a client-facing project, **BEFORE STARTING TO CODE**, strongly consider these suggestions for improved stability.

* Remove the more experimental `stage-0` from the babel config in `gulpfile.js`
* [shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap) your npm dependencies to exact version numbers

### Notes on Isomorphic Javascript:
Isomorphic web apps share the same codebase both server-side and client-side. The code is pre-compiled in NodeJS and delivered as HTML, where the client can pick back up and continue running the application with ReactJS.
##### E.g.
1. Runs a **Node** server at `./server.js`  
2. Request is processed and passed to **react-router** that decides which ReactJS component to render.
3. **ReactDOM/server** method **renderToString()** renders the component to a string of HTML.
4. **Iso**, [an isomorphic Alt helper library]((https://github.com/goatslacker/iso)), assists in passing in the component state as JSON.
5. HTML is rendered to a **swig** template and sent to client.
6. On the client-side, **Iso** reads the passed down state data and re-hydrates the ReactJS components.

### How to do Remote Preview
1. Run the Node server like normal
2. Get your IP address. (On Linux run `ifconfig|grep inet`, and look for `inet XX.XX.XX.XXX netmask 0xfffffc00 ...`)
3. Navigate to http://-your-ip-:port on your remote device

### Deploying to a Node server on Ubuntu 14.04 Trusty

#### git
    
    $ sudo apt-get update
    $ sudo apt-get install git

#### Get the code:

1. generate an ssh key, and add it to bitbucket if this deploy machine is new

#### NODE & NPM

    $ cd ~
    $ wget https://nodejs.org/dist/v4.2.3/node-v4.2.3-linux-x64.tar.gz
    $ mkdir node
    $ tar xvf node-v*.tar.gz --strip-components=1 -C ./node
    $ cd ~
    $ rm -rf node-v*
    $ mkdir node/etc
    $ echo 'prefix=/usr/local' > node/etc/npmrc
    $ sudo mv node /opt/
    $ sudo chown -R root: /opt/node
    $ sudo ln -s /opt/node/bin/node /usr/local/bin/node
    $ sudo ln -s /opt/node/bin/npm /usr/local/bin/npm
    
    $ cd /var/www/
    $ sudo mkdir react-iso-bootstrap
    $ sudo chown ubuntu react-iso-bootstrap
    $ git clone https://github.com/swieder227/react-iso-bootstrap.git
    $ cd react-iso-bootstrap

#### nginx
[nginx](http://nginx.org/en/) is the base HTTP web server that will accept requests and route to appropriate Node servers.

    # Install
    $ sudo apt-get update
    $ sudo apt-get install nginx
    
In this example code, we'll configure nginx to proxy requests for "example.com" to this box's localhost:8080.

    # Create the default configuration file 
    $ sudo vi /etc/nginx/sites-available/default
    
    # Use the following code template inside sites-available/default
    server {
        # Listen to requests on the default port
        listen 80;
    
        # If HTTP requst URL matches our server_name...
        server_name example.com;
    
        # And URL location matches...
        location / {
            # Apply these rules
            proxy_pass http://APP_PRIVATE_IP_ADDRESS:8080;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    
    # Exit vi and run this command for changes to take effect.
    $ sudo service nginx restart
    
#### PM2
[pm2](http://pm2.keymetrics.io/) is a concurrent process manager for starting/managing node servers.

    # Install globally if it doesn't exists
    $ sudo npm install pm2 -g

    # See current processes
    $ pm2 list
    
    # Start process with a pithy name
    $ pm2 start /path/to/project/node-entry-file.js --name PROCESS_NAME
    
    # Live view of log files from Node applications
    $ pm2 logs

    # Clear logs
    $ pm2 flush
   
**Important note:** When you update files in a Node project, the Node server process needs to restart.

    $  pm2 restart PROCESS_ID||PROCESS_NAME
 This can be done manually or with a watcher daemon such as [Nodemon](https://github.com/remy/nodemon).

### Resources: 
* [React on ES6+](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/)
* [Alt.js Guide](http://alt.js.org/guide/)
* [React DevTools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
