// Safari Polyfills for ReserVee

// URLSearchParams polyfill for older Safari
if (!window.URLSearchParams) {
  window.URLSearchParams = function(search) {
    var self = this;
    self.params = {};
    
    if (search) {
      search.replace(/^\?/, '').split('&').forEach(function(param) {
        var parts = param.split('=');
        if (parts.length === 2) {
          self.params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        }
      });
    }
    
    self.append = function(key, value) {
      self.params[key] = value;
    };
    
    self.toString = function() {
      var pairs = [];
      for (var key in self.params) {
        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(self.params[key]));
      }
      return pairs.join('&');
    };
  };
}

// Object.assign polyfill for older Safari
if (typeof Object.assign !== 'function') {
  Object.assign = function(target) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    
    var to = Object(target);
    
    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];
      
      if (nextSource != null) {
        for (var nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

// Array.from polyfill for older Safari
if (!Array.from) {
  Array.from = function(arrayLike) {
    var result = [];
    for (var i = 0; i < arrayLike.length; i++) {
      result.push(arrayLike[i]);
    }
    return result;
  };
}

// String.startsWith polyfill
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

// String.includes polyfill
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    if (typeof start !== 'number') {
      start = 0;
    }
    
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

// Promise polyfill check
if (typeof Promise === 'undefined') {
  console.warn('Promise not supported. Please use a Promise polyfill for Safari compatibility.');
}

// Fetch polyfill check
if (typeof fetch === 'undefined') {
  console.warn('Fetch not supported. Please use a fetch polyfill for Safari compatibility.');
}

console.log('✅ Safari polyfills loaded');
