# AgaveAPI.js

[![Build Status](https://travis-ci.org/mrhanlon/agaveapi-js.svg)](https://travis-ci.org/mrhanlon/agaveapi-js)

## Usage

AgaveAPI.js is designed to work both client-side in the browser and server-side for Node.js applications.

### Browser

Use the Agave API in client-side Javascript!

```
<script src="../vendor/vendor.js"></script>
<script src="../agaveapi.js"></script>
<script>
var agave = new Agave({
  url: 'https://agave.iplantc.org/docs/v2/resources/',
  authorizations: {
    'token_auth': new SwaggerClient.ApiKeyAuthorization('Authorization', 'Bearer __token__', 'header')
  }
});
agave.ready().then(function() {
  agave.api.files.listOnDefaultSystem({filePath: 'testuser'}, function(response) {
    console.log(response.obj.result);
  });
});
</script>
```

### Node.js

**Docs coming soon!**

## Development

You will need node.js, npm, and grunt installed on your system.

## Demo

Clone the repo, install the dependencies, and see how it works!

```bash
$> git clone https://github.com/mrhanlon/agaveapi-js.git
$> cd agaveapi-js
$> npm install
$> grunt serve
```
