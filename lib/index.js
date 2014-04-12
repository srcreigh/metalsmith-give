
var match = require('minimatch');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to give metadata to files that match a pattern.
 *
 * @param {Object} opts
 * @return {Function}
 */

function plugin(opts){
  opts = normalize(opts);

  return function(files, metalsmith, done){

    // for each file,
    Object.keys(files).forEach(function(file){
      var data = files[file];

      // and each pattern,
      Object.keys(opts).forEach(function(pattern){

        // if the file matches the pattern
        if ('options' != pattern && match(file, pattern, opts.options)) {
          var newData = opts[pattern] || {};

          // copy the specified data into the file's metadata
          Object.keys(newData).forEach(function(key){
            data[key] = newData[key];
          });
        }
      });
    });

    done();
  };
}

function normalize(opts){
  opts = opts || {};
  opts.options = opts.options || {};

  return opts;
}

