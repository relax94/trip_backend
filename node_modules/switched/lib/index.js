var debug = require('debug')('router');
var util = require('util');
var emit = require('events').EventEmitter.prototype.emit;
var slice = Array.prototype.slice;

exports = module.exports = Router;
exports.version = require('./../package.json').version;

/**
 * A generic event router
 *
 * @return Router
 */

function Router () {
  if (!(this instanceof Router)) return new Router();

  var index = 0;

  /**
   * @api public
   */

  function router () {
    router.route.apply(router, slice.call(arguments));
  }

  router.__proto__ = Router.prototype;

  /**
   * Inc the index
   *
   * @api private
   * @return Number
   */

  router.index = function () {
    return index++;
  };

  /**
   * Pushes the socket and arguments through the middleware
   *
   * @api public
   * @param {Error} err *optional
   * @param {Socket} socket
   * @param {Array} args
   * @param {Function} cb
   */

  router.route = function () {
    var args = slice.call(arguments);
    var name = '*';
    var err = null;
    var cb = function () { console.warn('default callback', slice.call(arguments)); };
    var end = function (err) { 
      if (cb.called) return;
      cb.called = new Date(); 
      cb.apply(cb, [err ? err : null].concat(args)); 
    };

    if ('string' === typeof args[0]) name = args.shift();
    if ('object' === typeof args[0] && args[0] instanceof Error) err = args.shift();
    if ('function' === typeof args[args.length - 1]) cb = args.pop();

    var i = 0, path = router.getPath(name), len = path.length;

    debug('got path the length is %s', len);

    (function step (err) {
      
      if (cb.called) return;

      debug('current step %s of %s', i+1, len);

      function next (err) {
        if (++i >= len) {
          end(err);
        }
        else {
          step(err);
        }
      }

      var fn = path[i];
      if (!fn) return next();

      try {
        if (err) {
          if (fn.err) {
            if (fn instanceof Router) {
              fn.route.apply(fn,[name, err].concat(args).concat(next).concat(end));
            }
            else {
              fn.apply(fn, [err].concat(args).concat(next).concat(end));
            }
          }
          else {
            next(err);
          }
        }
        else {
          if (fn.err) {
            next();
          }
          else {
            if (fn instanceof Router) {
              fn.route.apply(fn,[name].concat(args).concat(next).concat(end));
            }
            else {
              fn.apply(fn, args.concat(next).concat(end));
            }
          }
        }
      }
      catch(e) {
        debug('caught error %s', e);
        debug('the fn causing problems', fn);
        console.error(e.stack);
        next(e);
      }
      
    })(err);

  };
  
  return router;

};

/**
 * Gets the routing path given the name
 *
 * @api private
 * @param {String} name
 * @return Array
 */

Router.prototype.getPath = function (name) {
  debug('get path %s', name);
  name = name || '*';
  var fns = this._fns(), points = [], path = [];
  if (name === '*') {
    points = points.concat(fns[name]);
  }
  else {
    var keys = Object.keys(fns), i, key, match, regexp;
    for (i=0; i<keys.length; i++) {
      key = keys[i];
      if (util.isRegExp(key)) {
        regexp = key;
      }
      else {
        if (key.charAt(0) !== '/') {
          key = key.replace('*','.+');
        }
        else {
          key = key.slice(1, key.length-1);
        }
      }
      regexp = new RegExp(key);
      debug('regexp %s', regexp);
      match = String(name).match(regexp);
      if (match) {
        points = points.concat(fns[keys[i]]);
      }
    }
  }
  points
    .sort(function (a, b) { 
      return a[0] - b[0];
    })
    .forEach(function (point) {
      path.push(point[1]);
    });
  return path;
};

/**
 * Use this method to attach handlers, and other routers
 *
 * @api public
 * @param {mixed} Either a string and one of either a [function, or array of functions, or a Router]
 * @return Router
 */

Router.prototype.use = function () {
  if (!arguments.length) throw new Error('expecting at least one parameter');
  var args = slice.call(arguments);
  debug('use called %s', args);
  var name = typeof args[0] === 'string' || util.isRegExp(args[0]) ? args.shift() : '*';
  if (!args.length) throw new Error('we have the name, but need a handler');
  var self = this;
  var fns = this.fns(name);
  var i, arg, type;
  for (i=0; i<args.length; i++) {
    arg = args[i];
    if (util.isArray(arg)) return self.use.apply(self, arg);
    type = typeof arg;
    if ('function' !== type) return;
    //check the type of fn 
    if (arg.toString().match(/^function[\$\_\s\w]+?\(\s?err/)) {
      arg.err = true;
    }
    fns[fns.length] = [self.index(), arg];
  }
  return this;
};

/**
 * An alias to the `use` method.
 *
 * @api public
 * @param {mixed} Either a string, function, or array of functions
 * @return Router
 */

Router.prototype.on = Router.prototype.use;

/**
 * Gets the functions given the name.  Name will default to '*'
 *
 * @api private
 * @param {string} name
 * @return Array
 */

Router.prototype.fns = function (name) {
  name = name || '*';
  var _fns = this._fns();
  if (!_fns[name]) {
    _fns[name] = [];
  }
  return _fns[name];
};

/**
 * Gets the object that holds the points
 *
 * @api private
 * @return Object
 */

Router.prototype._fns = function () {
  if (!this.__fns) {
    this.__fns = {};
  }
  return this.__fns;
};
