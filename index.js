/**
 * Module dependencies.
 */

var sha256 = require('js-sha256');
var jsonp = require('jsonp');
var querystring = require('querystring');

/**
 * Creates an avatar url
 *
 * @param {String} email
 * @param {Number} size (20)
 * @return {String} gravatar url
 * @api public
 */

exports.url = function (email, config) {
  config = config || {};
  var qs = querystring.stringify(config);
  var qs = qs === '' ? '' : '?' + qs;
  var url = 'https://secure.gravatar.com/avatar/' + sha256(email.trim().toLowerCase()) + qs;
  return url;
};

/**
 * Looks up a profile.
 *
 * @param {String} email
 * @param {Function} callback
 * @api public
 */

exports.profile = function (email, fn) {
  var url = 'https://secure.gravatar.com/' + sha256(email.trim().toLowerCase());
  jsonp(url + '.json', function (err, obj) {
    if (err) return fn(err);
    if (obj && obj.entry) {
      fn(null, obj.entry[0]);
    } else {
      fn(new Error('Bad response'));
    }
  });
};
