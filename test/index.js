
/**
 * Load component
 */

var o = require('jquery');
var Grt = require('gravatar');

/**
 * DOM elements
 */

var body = o('body');
var img = o('.image-placeholder img');
var email = o('input[name=email]');
var size = o('input[name=size]');

function printAvatar(email, s){
  img.removeAttr('src');
  body.addClass('loading');

  var url = Grt.url(email, { s: s || 100 });
  img
  .attr('src', url)
  .on('load', function(){
    body.removeClass('loading');
  });
}

// input keypress event

o('input')
.focus()
.on('keypress', function(e){
  if (body.hasClass('loading')) return;
  if (e.keyCode == 13) printAvatar(email.val(), size.val());
})
.trigger('keypress');
