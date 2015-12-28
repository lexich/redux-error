### About redux-error
[![Build Status](https://travis-ci.org/lexich/redux-error.svg)](https://travis-ci.org/lexich/redux-error)
[![NPM version](https://badge.fury.io/js/redux-error.svg)](http://badge.fury.io/js/redux-error)
[![Coverage Status](https://coveralls.io/repos/lexich/redux-error/badge.png?branch=master)](https://coveralls.io/r/lexich/redux-error?branch=master)

###Usage
```js
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers"; // Redux reducers
import reduxError from "redux-error";

const crushReporter = reduxError.getCatcher(function(err) {
  console.error(err);
  // you can rethrow this error to global context with
  throw err; 
  /*
  it will be uncatch error;
  in node js you can catch it
  
  process.on("uncaughtException", function(err) {
    ....
  });
  
  in browser 
  window.onerror = function(error, url, lineNumber) {
    ....
  }
  */
});

const reducer = combineReducers( reducers );
const finalCreateStore = applyMiddleware(crushReporter, thunk)(createStore);
const store = finalCreateStore(reducer);
// .... other actions according redux manual
```
