var Agave = require('../../src/agaveapi');
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

  it('Agave.ready resolves after parsing API spec', function(done) {
    client = new Agave({url: 'https://api.example.com', spec: apiSpec});
    client.ready().then(
      function() {
        expect(client.api).toBeDefined();
        expect(client.api instanceof SwaggerClient).toBe(true);
        expect(client.api.apisArray.length).toBe(apiSpec.tags.length);
        done();
      },
      function(err) {
        fail(err);
        done();
      }
    );
  });

  it('Agave.api SwaggerClient has passed options.authorizations set', function(done) {
    var options = {
      url: 'https://api.example.com',
      spec: apiSpec,
      authorizations: {
        'Authorization': new SwaggerClient.ApiKeyAuthorization('Authorization', 'Bearer asdf1234', 'header')
      }
    };
    client = new Agave(options);
    client.ready().then(
      function() {
        expect(client.api.clientAuthorizations.authz).toBeDefined();
        expect(client.api.clientAuthorizations.authz.Authorization).toBeDefined();
        expect(client.api.clientAuthorizations.authz.Authorization).toEqual(options.authorizations.Authorization);
        done();
      },
      function(err) {
        fail(err);
        done();
      }
    );
  });

});
