/*
 * Swagger UI and Specs Servers
*/
'use strict';

var createServer = require('http-server').createServer;
var specServer;

module.exports.start = function (done) {
  specServer = createServer({ root: '.', cors: true });
  var port = process.env.PORT || 3000;
  specServer.listen(port);

  setTimeout(function(){
    done();
  }, process.env.TRAVIS ? 20000 : 3000);
};

module.exports.close = function() {
  specServer.close();
};
