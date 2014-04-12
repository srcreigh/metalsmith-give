# metalsmith-give
Use globbing patterns to give metadata to specific files.

## Installation
```npm install metalsmith-give```

#### CLI
```json
"plugins": {
  "metalsmith-give": {
    "about/*": {
      "here": "about"
    },
    "blog/*": {
      "here": "blog"
    }
  }
}
```

#### Javascript
```js
var give = require('metalsmith-give');

.use(give({
  "about/*": {
    here: "about"
  },
  "blog/*": {
    here: "blog"
  }
}))
```

#### License
MIT


