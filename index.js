"use strict";

function nextTick(fn) {
  return (process && process.nextTick) ?
    process.nextTick(fn) :
    setTimeout(fn, 0);
}

function getRaiser(_thrower) {
  var thrower = (typeof _thrower === "function") ? _thrower : function(err) {
    throw err;
  };
  return function(err) {
    if (!err) {
      return;
    }
    return nextTick(function() {
      thrower(err);
    });
  };
}

function getCatcher(thrower) {
  var raise = getRaiser(thrower);
  return function() {
    return function(next) {
      return function(action) {
        try {
          return next(action);
        } catch (err) {
          raise(err);
        }
      };
    };
  };
}

var thrower = getCatcher();
thrower.getCatcher = getCatcher;
module.exports = thrower;
