var Agave = require('../../src/agave');
var SwaggerClient = require('swagger-client');

describe('Sanity Checks', function() {
  'use strict';

  var apiSpec = require('./../swagger-spec/spec.json');

  var client;

  beforeEach(function() {
    client = new Agave({url: 'https://api.example.com', spec: apiSpec});
  });

  it('Creates an instance of the Agave object', function() {
    client = new Agave({url: 'https://api.example.com', spec: apiSpec});
    expect(client instanceof Agave).toBe(true);
  });

  it('Sets passed options', function() {
    client = new Agave({url: 'https://api.example.com', spec: apiSpec});
    expect(client.options.url).toBe('https://api.example.com');
  });

  it('Agave.ready rejects if "authorization" is missing', function(done) {
    client = new Agave({url: 'https://api.example.com', spec: apiSpec});
    client.ready().then(
      function() {
        throw 'Should not have resolved!';
      },
      function(err) {
        console.log(err);
        expect(true).toEqual(true);
        done();
      }
    );
  });

  it('Agave.ready resolves if "authorization" is set', function(done) {
    client = new Agave({
      url: 'https://api.example.com',
      spec: apiSpec,
      authorization: 'Bearer asdf1234'
    });
    client.ready().then(
      function() {
        expect(typeof client.api).toBe('object');
        expect(client.api instanceof SwaggerClient).toBe(true);
        done();
      },
      function(err) {
        console.log(err);
        throw 'Should have resolved!';
      }
    );
  });

});
