
/**
 * Load Components
 */

var o = require('jquery');
var Grt = require('gravatar');

/**
 * DOM elements
 */

var body = o('body');
var form = o('form.gravatar-form');
var img_ph = o('.image-placeholder');
var profile_ph = o('.profile-placeholder');
var img;

// fields
var fields = {
  email: o('input[name=email]').focus(),
  size: o('input[name=size]')
};

/**
 * Print the gratar image appending
 * an img element
 *
 * @param {String} email
 * @param {Object} opts
 * @api private
 */

function printAvatar(email, opts){
  opts = opts || {};

  if (img) img.remove();
  body.addClass('loading');

  img = o(Grt.img(email, opts))
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

form.on('submit', function(e){
  if (body.hasClass('loading')) return;
  e.preventDefault();

  printAvatar(fields.email.val(), {
    s: fields.size.val() || 400
  });
});

// get initial avatar
printAvatar('a@gmail.com', { s: 400 });
