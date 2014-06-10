var REasy = function (string) {
  this.setTestString(string);
};

REasy.prototype = {
  /* Properties */
  originalString: '',
  outputString: '',
  exp: '',
  _flags: '',
  ending_added: false,

  helpers: {
    ANY: {
      SINGLE_CHAR: '.',
      DIGIT: '\d',
      NON_DIGIT: '\D',
      ALPHANUMERIC: '\w',
      SINGLE_WHITESPACE: '\s',
      NON_WHITESPACE: '\S',
    },
    FEED: {
      FORM: '\f',
      LINE: '\n',
    },
    CARRIAGE_RETURN: '\r',
    TAB: '\t',
    VERTICAL_TAB: '\v',
    NON_WORD: '\W',
    NIL: '\0',

    FLAGS: {
      GLOBAL: 'g',
      CASE_SENSITIVE: 'i',
      MULTI_LINE: 'm',
      STICKY: 'y'
    }
  },

  /*
    Returns: array with matched options
  */
  execute: function() {
    var finalExpresion = new RegExp(this.exp, this._flags);
    return this.originalString.match(finalExpresion);
  },

  clearExp: function() {
    this.exp = '';
    return this;
  },

  setTestString: function(value) {
    this.originalString = value;
    return this;
  },

  startWith: function(value) {
    if(this.exp > 0) {
      throw new Error('Your expresion already have been initializated. ' + this.exp);
    }
    this.exp += "^";
    this.have(value);
    return this;
  },

  endWith: function (value) {
    if( "$" == this.exp.slice(-1) ) {
      throw new Error('Your expresion already has an ending. ' + this.exp);
    }
    this.have(value);
    this.exp += "$";
    return this;
  },

  atLeastOne: function(value) {
    this.have(value);
    this.exp += '+';
    return this;
  },

  any: function(value) {
    this.have(value);
    this.exp += '*';
    return this;
  },

  anything: function() {
    return this.any(this.helpers.ANY.SINGLE_CHAR);
  },

  something: function() {
    return this.atLeastOne(this.helpers.ANY.SINGLE_CHAR);
  },

  maybe: function(value) {
    this.have(value);
    this.exp += '?';
    return this;
  },

  have: function(value, n, m) {
    this.exp += '(?:' + value + ')';
    if ( 'integer' === typeof(n) && n > 0 && 'undefined' === typeof(m) ) {
      this.exp += '{' + n + '}';
    }
    if ( 'integer' === typeof(m) && 'integer' === typeof(n) && n > 0 && m > 0) {
      this.exp += '{' + n + ',' + m + '}';
    }
    return this;
  },

  group: function(callback) {
    this.exp += '(';
    callback(this);
    this.exp += ')';
    return this;
  },

  addFlag: function(flag) {
    this._flags += flag;
    return this;
  },

  clearFlags: function() {
    this._flags = '';
    return this;
  },

  /* Aliases */
  andEndWith: function(value) {
    return this.endWith(value);
  },
  andHave: function(value) {
    return this.have(value);
  },

};
