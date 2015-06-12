(function() {
'use strict';

var log = function() {
  if (console) {
    console.log(Array.prototype.slice.call(arguments)[0]);
  }
};

var root = this;

var hasRequire = typeof require !== 'undefined';

var Promise = root.Promise;
if (typeof Promise === 'undefined') {
  if (hasRequire) {
    Promise = require('es6-promise').Promise;
  } else {
    throw new Error('Agave.js requires Promise');
  }
}

var SwaggerClient = root.SwaggerClient;
if (typeof SwaggerClient === 'undefined') {
  if (hasRequire) {
    SwaggerClient = require('swagger-client');
  } else {
    throw new Error('Agave.js requires SwaggerClient');
  }
}

var Agave = function(options) {
  if (! (this instanceof Agave)) {
    return new Agave(options);
  }
  this.options = options;
};

if(typeof exports !== 'undefined') {
  if(typeof module !== 'undefined' && module.exports) {
    exports = module.exports = Agave;
  }
  exports.Agave = Agave;
}
else {
  root.Agave = Agave;
}

Agave.prototype.ready = function() {
  var self = this;
  if (! self._ready) {
    self._ready = new Promise(function(resolve, reject) {
      self.api = new SwaggerClient();
      self.api.initialize({
        url: self.options.url,
        spec: self.options.spec,
        authorizations: self.options.authorizations,
        success: function() {
          if (self.api.ready === true) {
            resolve(self);
          }
        },
        failure: reject
      });
    });
  }
  return self._ready;
};

Agave.prototype.initialize = function() {
  log('Agave.initialize is deprecated! Use Agave.ready() instead.');
  return this.ready().then(function() {
    if (typeof root.CustomEvent !== 'undefined') {
      root.dispatchEvent(new CustomEvent('Agave::ready'));
    }
  });
};

}).call(this);
