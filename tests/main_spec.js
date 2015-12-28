"use strict";
/* global describe, it */
/* jshint expr: true */

var expect = require("chai").expect;
var thrower = require("../");
var redux = require("redux");
var thunk = require("redux-thunk");

describe("check redux-error", function() {
  it("check export object", function() {
    expect(thrower).to.be.an("function");
    expect(thrower.getCatcher).to.be.an("function");
  });
  it("check default", function(done) {
    var reducer = redux.combineReducers({
      test: function() {
        return {};
      }
    });
    var error = new Error("catch me");
    function catchFn(err) {
      expect(err === error).to.be.true;
      done();
    }
    var createStoreWithMiddleware = redux.applyMiddleware(thrower.getCatcher(catchFn), thunk)(redux.createStore);
    var store = createStoreWithMiddleware(reducer);
    function testAction() {
      return function() {
        throw error;
      };
    }
    store.dispatch(testAction());
  });
});
