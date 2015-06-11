# Agave.js

[![Build Status](https://travis-ci.org/mrhanlon/agave-js.svg)](https://travis-ci.org/mrhanlon/agave-js)

## Usage

### Node.js

**Docs coming soon!**

### Browser

Use the Agave API in client-side Javascript!

```
<script src="../vendor/vendor.js"></script>
<script src="../agave.js"></script>
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

## Development

You will need node.js, npm, and grunt installed on your system.

## Demo

Clone the repo, install the dependencies, and see how it works!

```bash
$> git clone https://github.com/mrhanlon/agave-js.git
$> cd agave-auth-js
$> npm install
$> grunt serve
```
