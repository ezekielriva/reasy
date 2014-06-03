var REasy = function (string) {
  this.originalString = string;
};

REasy.prototype = {
  /* Properties */
  originalString: '',
  outputString: '',
  exp: '',
  flasgs: '',

  /*
    Returns: array with matched options
  */
  execute: function() {
    var finalExpresion = new RegExp(this.exp, this.flags);
    return this.originalString.match(finalExpresion);
  },

  startWith: function(value) {
    if(this.exp > 0) {
      throw new Error('You expresion already has been initializated. ' + this.exp);
    }
    this.exp += "^" + value;
    return this;
  },

  have: function(value) {
    this.exp += value;
    return this;
  },

  andHave: function(value) {
    return this.have(value);
  },

};
