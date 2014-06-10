var REasy = function (string) {
  this.originalString = string;
};

REasy.prototype = {
  /* Properties */
  originalString: '',
  outputString: '',
  exp: '',
  flasgs: '',
  ending_added: false,

  /*
    Returns: array with matched options
  */
  execute: function() {
    var finalExpresion = new RegExp(this.exp, this.flags);
    return this.originalString.match(finalExpresion);
  },

  startWith: function(value) {
    if(this.exp > 0) {
      throw new Error('Your expresion already have been initializated. ' + this.exp);
    }
    this.exp += "^" + value;
    return this;
  },

  endWith: function (value) {
    if( "$" == this.exp.slice(-1) ) {
      throw new Error('Your expresion already has an ending. ' + this.exp);
    }
    this.exp += value + "$";
    return this;
  },

  atLeastOne: function() {
    var value = ( arguments.length > 0 )? arguments[0] + "+" : "+";
    return this.have(value);
  },

  maybe: function(value) {
    return this.have(value + '?');
  },

  have: function(value) {
    this.exp += value;
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
