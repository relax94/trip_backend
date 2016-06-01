[![Build Status](https://travis-ci.org/turbonetix/switched.svg?branch=master)](https://travis-ci.org/turbonetix/switched)
[![NPM version](https://badge.fury.io/js/switched.svg)](http://badge.fury.io/js/switched)
[![David DM](https://david-dm.org/turbonetix/switched.png)](https://david-dm.org/turbonetix/switched.png)

Route your data through a series of middleware functions.

`$ npm install switched`

```javascript
var router = require('switched');
router.on(/[\w\s]+/, function (arg, next, end) {
  arg.count = 0;
  next();
});
router.on(function (arg, next, end) {
  arg.count++;
  next();
});
router.on(function (err, arg, next, end) {
  console.error(err);
  arg.count++;
  next();
});
router.on('some event', function (arg, next, end) {
  arg.count++;
  console.log('count %s', arg.count);
});
router('some event', {some:'argument'});
```

# Features

* Express-like routing capabilties for data.
* Gives you more control over how data is handled.
* Attach `Switched` instances to other `Switched` instances.
* Support for "wildcard" (*) and Regular Expression matching.

# API

## Router

Get the `Router` class.

```javascript
var Router = require('switched');
```

The `use` and `on` methods are equivalent.  They also can be chained.

```javascript
var router = Router()
  .use(function (arg, next) { })
  .use(function (arg, next) { })
  .use(function (arg, next) { });
```

### Router#()

Make a `Router` instance

```javascript
var router = Router();
```

### Router#use(fn:Function, ...)

Attach a `function` to the router.

```javascript
router.use(function (arg, next) {
  //do something!
  next();
});
```

You can pass in multiple `function`s.

```javascript
var a = function (arg, next, end) { next() };
var b = function (arg, next, end) { next() };
var c = function (arg, next, end) { next() };

router.use(a,b,c); 
```

You can pass in a function that accepts an `Error` object.

```javascript
router.use(function (err, arg, next, end) {
  console.error(err);
  
  //calling next(err) will invoke the next error handler.
  //to resume operation just call next()
  next(err);
});
```

### Router#use(event:String, fn:Function, ...)

Bind the `function` to the `event`.

```javascript
router.use('some event', function (arg, next) {
  next();
});
```

You can also pass in multiple `function`s for handling the `event`.

```javascript
var chop = function (arg, next, end) { next() };
var clean = function (arg, next, end) { next() };
var pretty = function (arg, next, end) { next() };

router.use('some event', chop, clean, pretty);
```

### Router#use(event:RegExp, fn:Function, ...)

Bind the `function` using a `RegExp` pattern to match the `event`.

```javascript
router.use(/\w+/, function (arg, next, end) {
  next();
});
```

You can also pass in multiple `function`s for handling the `event`.

```javascript
var chop = function (arg, next, end) { next() };
var clean = function (arg, next, end) { next() };
var pretty = function (arg, next, end) { next() };

router.use(/\w+/, chop, clean, pretty);
```

### Router#use(router:Router, ...)

You can attach another `Router` instance to your `Router` instance.

```javascript
var another = Router();
another.use(function (arg, next, end) { next(); });

router.use(another);
```

Attach multiple routers in a single call.

```javascript
var foo = Router();
foo.use(function (arg, next, end) { next(); });

var bar = Router();
bar.use(function (arg, next, end) { next(); });

var baz = Router();
baz.use(function (arg, next, end) { next(); });

router.use(foo, bar, baz);
```

### Router#use(name:String, router:Router, ...)

Just like attaching a `function` to the router given the `event`.  You can attach `Router`
instance as well to the `event`.

```javascript
var foo = Router();
foo.use(function (arg, next, end) { next(); });

router.use('some event', foo);
```

Attach multiple routers in a single call to the `event` too.

```javascript
var foo = Router();
foo.use(function (arg, next, end) { next(); });

var bar = Router();
bar.use(function (arg, next, end) { next(); });

var baz = Router();
baz.use(function (arg, next, end) { next(); });

router.use('some event', foo, bar, baz);
```

### Router#use(fns:Array, ...)

Attach an `Array` of `Fuction`'s or `Router` instances, or an `Array` or `Array`s .

```javascript
var middleware = [
  function (arg, next, end) { next(); },
  [
    function (arg, next, end) { next(); },
    Router().use(function (arg, next, end) { next(); }),
    function (arg, next, end) { next(); },
  ],
  Router().use(function (arg, next, end) { next(); })
];

var errHandler = function (err, arg, next, end) { next(err); } 

router.use(middleware, errHandler);
```

### Router#use(name:String, fns:Array, ...)

Attach everything to an event.

```javascript
var middleware = [
  function (arg, next, end) { next(); },
  [
    function (arg, next, end) { next(); },
    Router().use(function (arg, next, end) { next(); }),
    function (arg, next, end) { next(); },
  ],
  Router().use(function (arg, next, end) { next(); })
];

var errHandler = function (err, arg, next, end) { next(err); } 

router.use('only this event', middleware, errHandler);
```

### Router#on(...)

This is an alias to to the `use` method.  It does the same thing.

```javascript
router.on(function (arg, next, end) { next() });
```

# Installation and Environment Setup

Install node.js (See download and install instructions here: http://nodejs.org/).

Clone this repository

    > git clone git@github.com:turbonetix/switched.git

cd into the directory and install the dependencies

    > cd switched
    > npm install && npm shrinkwrap --dev

# Running Tests

Install coffee-script

    > npm install coffee-script -g

Tests are run using grunt.  You must first globally install the grunt-cli with npm.

    > sudo npm install -g grunt-cli

## Unit Tests

To run the tests, just run grunt

    > grunt spec
