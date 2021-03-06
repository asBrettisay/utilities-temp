/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (n > array.length) {
      n = array.length;
    }
    if (n) {
      for (var i = 0, ans = []; i <= n - 1; i++) {
        ans.push(array[i]);
      }
      return ans;
    } else {
      return array[0];
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n) {
      n = array.length - n;
      for (var i = 0, ans = []; i < array.length; i++) {
        if (i >= n) {
          ans.push(array[i]);
        }
      }
      return ans;

    } else {
      return array[array.length - 1];
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for(var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection)
      }
    } else {
      for (var prop in collection) {
        iterator(collection[prop], prop, collection)
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for (var i = 0; i < array.length; i++) {
      if (array[i] === target) {
        return i;
      }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    for (var i = 0, ans = []; i < collection.length; i++) {
      if (iterator(collection[i])) {
        ans.push(collection[i])
      }
    }
    return ans;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    for (var i = 0, ans = []; i < collection.length; i++) {
      if (!(iterator(collection[i]))) {
        ans.push(collection[i]);
      }
    }
    return ans;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    for (var i = 0; i < array.length; i++) {
      for (var j = i+1; j < array.length; j++) {
        if (array[i] === array[j]) array.splice(i, 1);
      }
    }
    return array.sort();
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    for (var i = 0, ans = []; i < array.length; i++) {
      ans.push(iterator(array[i]));
    }
    return ans;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var ans = [];
    for (var i = 0; i < array.length; i++) {
      ans.push(array[i][propertyName]);
    }
    return ans;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    for (var i = 0, item; i < list.length; i++) {
      item = list[i];
      if (typeof(methodName) === "string") {
        item[methodName](args);
      } else {
        methodName.call(item, args)
      }
    }
    return list;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    var initialValue = initialValue ? initialValue : 0;
    for (var i = 0; i < collection.length; i++) {
      initialValue = iterator(initialValue, collection[i])
    }
    return initialValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    var contains = false;
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        if (collection[i] === target) {
          contains = true;
        }
      }
    } else {
      for (var prop in collection) {
        if (collection[prop] === target) {
          contains = true;
        }
      }
    }
    return contains;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if (!(iterator)) {
      return true;
    }
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        if (!(iterator(collection[i]))) {
          return false;
        }
      }
      return true;
    } else {
      for (var prop in collection) {
        if (!(iterator(collection[prop]))) {
          return false;
        }
      }
      return true;
    }
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if (!(iterator)) {
      iterator = Boolean;
    }
    var some = false;
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        if (iterator(collection[i])) {
          some = true;
        }
      }
    } else {
      for (var prop in collection) {
        if (iterator(collection[prop])) {
          some = true;
        }
      }
    }
    return some;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    // Fetch the passed in objects, however many, from the arguments object.
    var objectList = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));

    objectList.forEach(function(obj2) {
      for (var prop in obj2) {
        obj[prop] = obj2[prop];
      }
    })
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    // Fetch the passed in objects, however many, from the arguments object.
    var objectList = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));

    objectList.forEach(function(obj2) {
      for (var prop in obj2) {
        if (!(prop in obj)) {
          obj[prop] = obj2[prop]
        }
      }
    })
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    _.once.invoked = false;
    return function() {
      if (_.once.invoked) {
        return _.once.value
      } else {
        _.once.invoked = true;
        return _.once.value = func();
      }
    }
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var results = {};
    return function(arg) {
      if (results[arg]) {
        return results[arg];
      } else {
        return results[arg] = func(arg);
      }
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var argsList = Array.apply(null, arguments);
    argsList.splice(0, 2);
    return setTimeout(function() {
      return func.apply(null, argsList)
    }, wait);
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    var ans = [], l = array.length;

    for (var i = 0; i < l; i++) {
      var newIndex = Math.random() * l;
      ans.splice(newIndex, 0, array[i]);
    }
    return ans;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if (typeof(iterator) === 'string') {
      // If iterator is a string, convert it into a function to return the right information.
      var arg = iterator;
      iterator = function(obj) {
        return obj[arg];
      }
    }

    var nullValues = [];

    function sorter() {
      var swap = false

      for (var i = 0; i < collection.length-1; i++) {

        if (iterator(collection[i]) === undefined) {
          // I don't know what else to do with undefined values, so put them in an array and we will boot them to the end of the array at the end.
          nullValues.push(collection[i]);
          collection.splice(i, 1)
        }
        else if ((iterator(collection[i])) <= iterator(collection[i+1])) {
          continue;
        }
        else {
          swap = true;
          var store = collection[i+1];
          collection[i+1] = collection[i];
          collection[i] = store;
        }
      }
      // Keep swapping until everything is in order.
      if(swap) { return sorter() }
    }

    sorter();
    // Here we push those null values back to the end of the array.
    nullValues.forEach(function(x) {
      collection.push(x);
    })
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var argumentsList = (arguments.length === 1 ? [arguments[0]] :
    Array.apply(null, arguments));

    var longest = [];
    argumentsList.forEach(function(x){
      if (x.length > longest.length) {
        longest = x;
      }
    })

    var ans = [], l = longest.length;

    argumentsList.forEach(function(arr) {
      for (var i = 0; i < l; i++) {
        ans[i] ? ans[i].push(arr[i]) : ans[i] = [arr[i]];
      }
    })

    return ans;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
    var ans = [];
    function flat(array) {
      for (var i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
          flat(array[i])
        } else {
          ans.push(array[i]);
        }
      }
    }
    flat(nestedArray);
    return ans;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var argumentsList = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));

    var lastArray = argumentsList.splice(0,1);
    var matches = [];

    argumentsList.forEach(function(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (lastArray[0].indexOf(arr[i]) > -1 ) {
          matches.push(arr[i]);
        }
      }
      for (var i = 0; i < matches.length; i++) {
        if (arr.indexOf(matches[i]) === -1 ) {
          matches.splice(arr.indexOf(matches[i], 1));
        }
      }
      lastArray[0] = arr;
    })
    return matches;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var argumentsList = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    var firstArr = argumentsList.splice(0,1)
    argumentsList.forEach(function(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (firstArr[0].indexOf(arr[i]) > -1 ) {
          firstArr[0].splice(firstArr[0].indexOf(arr[i]), 1)
        }
      }
    })
    var ans = firstArr[0].map(function(i) {
      return i;
    })
    return ans;

  };

}).call(this);
