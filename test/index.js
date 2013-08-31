
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
var profile_ph = o('.profile-placeholder');
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

  profile_ph.empty();
  var profile = Grt.profile(email, function(err, data){
    var prts = [
      'displayName',
      'profileUrl',
      'id',
      'hash',
      'requestHash',
      'thumbnailUrl'
    ];

    for (var i = 0; i < prts.length; i++) {
      if (data[prts[i]]) {
        profile_ph.append(o('<p>').append(
          o('<span>', { text: prts[i] + ': ' }),
          o('<strong>', { text: data[prts[i]] })
        ));
      }
    }
  });
}

// input keypress event

o('input')
.on('keypress', function(e){
  if (body.hasClass('loading')) return;
  if (e.keyCode == 13) printAvatar(email.val(), size.val());
});

// get initial avatar
printAvatar('a@gmail.com', 400);
