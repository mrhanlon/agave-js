/*globals Agave, SwaggerClient*/
describe('Sanity Checks', function() {
  'use strict';

  var client;

  it('Creates an instance of the Agave object', function() {
    client = new Agave({url: 'https://api.example.com', spec: {}});
    expect(client instanceof Agave).toBe(true);
  });

  it('Sets passed options', function() {
    client = new Agave({url: 'https://api.example.com', spec: {}});
    expect(client.options.url).toBe('https://api.example.com');
  });

  it('Agave.ready rejects if "authorization" is missing', function(done) {
    client = new Agave({url: 'https://api.example.com', spec: {}});
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
      spec: {},
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
