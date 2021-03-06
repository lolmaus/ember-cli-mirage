/*jshint node:true*/
'use strict'

var path = require('path');

module.exports = {
  name: 'mirage:factory',
  description: 'Generates a mirage factory.',

  fileMapTokens: function() {
    return {
      __root__: function(options) {
        if (options.inAddon) {
          return path.join('tests', 'dummy');
        }

        return '/';
      }
    };
  }

};
