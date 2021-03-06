var Reasy = (function () {
  "use strict";
  // Constructor
  // -----------
  // Easy constuctor that can get a test string.
  //   - string `[string]` `(optional)`: original string to apply the regex
  // - - -
  var Reasy = function (string) {
    var _testString,
        _flags,
        _exp
    ;

    _testString = string;

    // Methods
    // -------

    // Execute the generated expresion over test string.
    //
    // Returns:
    //  - `[Array]`: array of matched elements.
    //  - `[null]` if does not match anything.
    // - - -
    this.execute = function () {
      return _testString.match( this.getRegex() );
    };

    // Clean the generated expresion
    //
    // Return: `[object this]`
    // - - -
    this.clearExp = function() {
      _exp = '';
      return this;
    };

    // Set test string
    //
    // Return: `[object this]`
    // - - -
    this.setTestString = function(value) {
      _testString = value;
      return this;
    },

    // Get the generated regex
    //
    // Return: `[object RegExp]`
    // - - -
    this.getRegex = function() {
      return new RegExp(_exp, this._flags);
    },

    // Set initial matching value.
    //
    // It adds `^` symbol to value passed by param
    //
    // Param: value `[string]`
    //
    // Return: `[object this]`
    //
    // Throw:
    //  - Your expresion already have been initializated. {expresion}
    // - - -
    this.startWith = function(value) {
      if(_exp.length > 0) {
        throw new Error('Your expresion already have been initializated. ' + _exp);
      }
      _exp += "^";
      this.have(value);
      return this;
    },

    // Set end matching value. It adds `$` symbol to value passed by param
    //
    // Matches end of input. If the multiline flag is set to true, also matches
    // immediately before a line break character.
    //
    // Param: value `[string]`
    //
    // Return: `[object this]`
    //
    // Throw:
    //  - Your expresion already has an ending. {expresion}
    // - - -
    this.endWith = function (value) {
      if( "$" === _exp.slice(-1) ) {
        throw new Error('Your expresion already has an ending. ' + _exp);
      }
      this.have(value);
      _exp += "$";
      return this;
    },

    // Matches the param 1 or more times. Add `+` matcher to value passed by param
    //
    // Params: value `[string]`
    //
    // Return: `[object this]`
    // - - -
    this.atLeastOne = function(value) {
      this.have(value);
      _exp += '+';
      return this;
    },

    // Matches the param 0 or more times. Add `*` matcher to value passed by param
    //
    // Params: value `[string]`
    //
    // Return: `[object this]`
    // - - -
    this.any = function(value) {
      this.have(value);
      _exp += '*';
      return this;
    },

    // Match any char 0 or more times. Alias for `regex.any('.')`
    //
    // Return: `[object this]`
    // - - -
    this.anything = function() {
      return this.any(this.helpers.ANY.SINGLE_CHAR);
    },

    // Match any char 1 or more times. Alias for `regex.atLeastOne('.')`
    //
    // Return: `[object this]`
    // - - -
    this.something = function() {
      return this.atLeastOne(this.helpers.ANY.SINGLE_CHAR);
    },

    // Matches the value 0 or 1 time. Add `?` matcher to value passed by param
    //
    // Params: value `[string]`
    //
    // Return: `[object this]`
    // - - -
    this.maybe = function(value) {
      this.have(value);
      _exp += '?';
      return this;
    },

    // Matches the value passed by param. It can get extra parameters to set
    // quantity of ocurrences range
    //
    // Params:
    //  - value `[string]`: matched string.
    //  - n `[integer]` `(optional)`: the exactly number of ocurrences.
    //  - m `[integer]` `(optional)`: the limit of ocurrences.
    //
    // Return: `[object this]`
    // - - -
    this.have = function(value, n, m) {
      _exp += '(?:' + value + ')';
      if ( "number" === typeof(n) && n > 0 && 'undefined' === typeof(m) ) {
        _exp += '{' + n + '}';
      }
      if ( "number" === typeof(m) && "number" === typeof(n) && n > 0 && m > 0) {
        _exp += '{' + n + ',' + m + '}';
      }
      return this;
    },

    // Generate a group of expresions.
    //
    // Params:
    //  - callback `[function]`: the fuction receive as parameter `this` object
    //
    // Return: `[object this]`
    // - - -
    this.group = function(callback) {
      _exp += '(';
      callback(this);
      _exp += ')';
      return this;
    },

    // Add a flag passed by param to expresion execution
    //
    // Params:
    //  - flag `[string]`: it can take any value from this list:
    //    - `helpers.FLAGS.GLOBAL_SEARCH`
    //    - `helpers.FLAGS.CASE_SENSITIVE`
    //    - `helpers.FLAGS.MULTI_LINE`
    //    - `helpers.FLAGS.STICKY`
    //
    // Return: `[object this]`
    // - - -
    this.addFlag = function(flag) {
      this._flags += flag;
      return this;
    },

    // Removes all flags.
    //
    // Return: `[object this]`
    //
    this.clearFlags = function() {
      this._flags = '';
      return this;
    },

    // Aliases
    // -------

    // Alias for endWith
    // - - -
    this.andEndWith = function(value) {
      return this.endWith(value);
    },

    // Alias for have
    //
    this.andHave = function(value) {
      return this.have(value);
    },
  };

  Reasy.prototype = {
    // Helpers
    // -------
    // Interesting helpers to be used by the user. It includes all basic selectors.
    helpers: {
      ANY: {
        SINGLE_CHAR: '.',
        DIGIT: ' \\d',
        NON_DIGIT: ' \\D',
        ALPHANUMERIC: ' \\w',
        SINGLE_WHITESPACE: ' \\s',
        NON_WHITESPACE: ' \\S',
      },
      FEED: {
        FORM: ' \\f',
        LINE: ' \\n',
      },
      CARRIAGE_RETURN: ' \\r',
      TAB: ' \\t',
      VERTICAL_TAB: ' \\v',
      NON_WORD: ' \\W',
      NIL: ' \\0',

      FLAGS: {
        GLOBAL: 'g',
        CASE_SENSITIVE: 'i',
        MULTI_LINE: 'm',
        STICKY: 'y'
      }
    }
  };

  return Reasy;
})();
