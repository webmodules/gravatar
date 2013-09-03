/**
 * Module dependencies.
 */

var md5 = require('md5')
  , jsonp = require('jsonp')
  , querystring = require('querystring');

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
  var qs = querystring.stringify(config)
    , qs = qs === "" ? "" : "?" + qs
    , url = 'https://secure.gravatar.com/avatar/' + md5(email) + qs;
  return url;
};

/**
 * Creates an avatar <img> element
 *
 * @param {String} email
 * @param {Number} size (80)
 * @return {Image} image dom
 * @api public
 */

exports.img = function (email, config) {
  config = config || {};
  var size = config.s || config.size;
  var url = exports.url(email, config);
  var el = document.createElement('img');
  el.setAttribute('src', url);
  if (size) {
    el.setAttribute('width', size);
    el.setAttribute('height', size);
  }
  return el;
};


/**
 * Looks up a profile.
 *
 * @param {String} email
 * @param {Function} callback
 * @api public
 */

exports.profile = function (email, fn) {
  var url = exports.url(email);
  jsonp(url + '.json', function (err, obj) {
    if (err) return fn(err);
    if (obj && obj.entry) {
      fn(null, obj.entry[0]);
    } else {
      fn(new Error('Bad response'));
    }
  });
};

/**
 * Shortcut to produce a username from an email.
 *
 * @param {String} email
 * @param {Function} callback
 * @api public
 */

exports.username = function (email, fn) {
  exports.profile(email, function (err, prof) {
    if (err) return fn(err);
    if (prof && prof.preferredUsername) {
      fn(null, prof.preferredUsername);
    } else {
      fn(null, '');
    }
  });
};
