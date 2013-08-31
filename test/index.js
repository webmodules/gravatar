
/**
 * Load Components
 */

var o = require('jquery');
var Grt = require('gravatar');

/**
 * DOM elements
 */

var body = o('body');
var img_ph = o('.image-placeholder');
var email = o('input[name=email]').focus();
var size = o('input[name=size]');
var img;

/**
 * Print the gratar image appending
 * an img element
 *
 * @param {String} email
 * @param {Number} s
 * @api private
 */

function printAvatar(email, s){
  if (img) img.remove();
  body.addClass('loading');

  img = o(Grt.img(email, { s: s || 100 }))
  .appendTo(img_ph)
  .on('load', function(){
    body.removeClass('loading');
  });
}

// input keypress event

o('input')
.on('keypress', function(e){
  if (body.hasClass('loading')) return;
  if (e.keyCode == 13) printAvatar(email.val(), size.val());
});