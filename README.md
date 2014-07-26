Multi-SSH client
============
Front End for executing commands on multiple SSH servers at the same time.

## Features
* Built in React
* Pages to manage servers, groups, and commands
* Opens websocket to run commands.  Updates with data when received until command finishes.

## Getting started
* Edit Config.jsx to point to backend address.  (_Can be nodejs server or go server_)
* Run gulp to start node server
```
gulp
```
* Produce production ready single uglified+minified js file and index page
```
gulp build //gulp.env = production
```

Server: https://github.com/matthunter/mussh
