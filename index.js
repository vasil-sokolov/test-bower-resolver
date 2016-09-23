var tmp = require('tmp');

/**
 * Factory function for resolver
 * It is called only one time by Bower, to instantiate resolver.
 * You can instantiate here any caches or create helper functions.
 */
module.exports = function resolver (bower) {

  // Resolver factory returns an instance of resolver
  return {

    // Match method tells whether resolver supports given source
    // It can return either boolean or promise of boolean
    match: function (source) {
      return source.indexOf('githib.com') === 0
    },

    // Optional:
    // Can resolve or normalize sources, like:
    // "jquery" => "git://github.com/jquery/jquery.git"
    locate: function (source) {
      return source;
    },

    // Optional:
    // Allows to list available versions of given source.
    // Bower chooses matching release and passes it to "fetch"
    releases: function (source) {
      return [
        { target: 'v1.0.0', version: '1.0.0' },
        { target: 'v1.0.1', version: '1.0.1' }
      ]
    },

    // It downloads package and extracts it to temporary directory
    // You can use npm's "tmp" package to tmp directories
    // See the "Resolver API" section for details on this method
    fetch: function (endpoint, cached) {
      // If cached version of package exists, re-use it
      if (cached && cached.version) {
        return;
      }

      var tempDir = tmp.dirSync();

      // ... download package to tempDir

      return {
        tempPath: tempDir.name,
        removeIgnores: true
      }
    }
  }
}
