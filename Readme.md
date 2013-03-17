
# gravatar

  Generate client-side gravatars

## Installation

    $ component install monstercat/gravatar

## API

### options

Most API calls take an option used to configure the url.

Options are the query string parameters described in the gravatar [documentation](https://en.gravatar.com/site/implement/images/)

  * **s** - size
  * **d** - default image `url` or {`404`,`mm`,`identicon`,`monsterid`,`wavatar`,`retro`,`blank`}
  * **r** - one of {`g`,`pg`,`r`,`x`}
  * **forcedefault** - force default image

### .url(email, options)

Return the gravatar image url for an email

### .img(email, options)

Creates an avatar `<img>` element

### .profile(email, callback(err, profile))

Looks up a profile

### .username(email, callback(err, username))

Shortcut that calls `.profile` to get a username from an email.

## License

  MIT
