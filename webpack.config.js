/**
 * @author: @AngularClass
 */

// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
  default:
    module.exports = require('./config/webpack.dev')({env: 'development'});
}
