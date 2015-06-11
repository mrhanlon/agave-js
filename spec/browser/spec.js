/*globals Agave, SwaggerClient, readJSON*/
describe('Sanity Checks', function() {
  'use strict';

  var client;

  it('Creates an instance of the Agave object', function() {
    client = new Agave({url: 'https://api.example.com'});
    expect(client instanceof Agave).toBe(true);
  });

  it('Sets passed options', function() {
    client = new Agave({url: 'https://api.example.com'});
    expect(client.options.url).toBe('https://api.example.com');
  });

  it('Agave.ready resolves after parsing API spec', function(done) {
    var apiSpec = readJSON('spec/swagger-spec/spec.json');
    client = new Agave({url: 'http://localhost:9876/base/spec/swagger-spec/spec.json'});
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
      url: 'http://localhost:9876/base/spec/swagger-spec/spec.json',
      authorizations: {
        'Authorization': new SwaggerClient.ApiKeyAuthorization('Authorization', 'Bearer __token__', 'header')
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
