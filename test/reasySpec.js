describe("REasy", function() {
  var reasy;
  describe("constructor", function() {
    it('should initialize original string', function() {
      var reasy = new REasy('original');
      expect(reasy.originalString).toEqual('original');
    });
  });

  describe(".startWith", function() {
    beforeEach(function() {
      reasy = new REasy();
    });

    it("should add to exp the initial state of string matched", function() {
      reasy.startWith('b');
      expect(reasy.exp).toEqual('^b');
    });

    it("should return object", function() {
      expect(reasy.startWith('b')).toEqual(reasy);
    });

    it("should not add a new initial value if already exists one", function() {
      reasy.startWith('b');
      expect( reasy.startWith('b') ).toThrow;
    });
  });

  describe(".endWith/.andEndWith", function() {
    beforeEach(function() {
      reasy = new REasy();
    });

    it("should add to exp the ending state of string matched", function() {
      reasy.endWith('b');
      expect(reasy.exp).toEqual('b$');
    });

    it("should return object", function() {
      expect(reasy.endWith('b')).toEqual(reasy);
    });

    /*it("should throw an error if already exists one", function() {
      reasy.endWith('b');
      expect( reasy.endWith('b') ).toThrow;
    });*/
  });

  describe(".have/.andHave", function() {
    beforeEach(function() {
      reasy = new REasy();
    });

    it("should add to matcher current value", function() {
      reasy.have('b');
      expect(reasy.exp).toEqual('b');
    });

    it("should return object", function() {
      expect( reasy.have('b') ).toEqual(reasy);
    });
  });

  describe(".atLeastOne", function() {
    beforeEach(function() {
      reasy = new REasy();
    });

    it("should add a plus into exp if it has not arguments", function() {
      reasy.have('b');
      reasy.atLeastOne();
      expect( reasy.exp ).toEqual('b+');
    });

    it("should add a plus and its arguments", function() {
      reasy.have('b');
      reasy.atLeastOne('b');
      expect( reasy.exp ).toEqual('bb+');
    });

    it("should return object", function() {
      expect( reasy.atLeastOne('b') ).toEqual(reasy);
    });
  });

  describe('.maybe', function() {
    beforeEach(function () {
      reasy = new REasy();
    });

    it("should return object", function() {
      expect( reasy.maybe('ab') ).toEqual(reasy);
    });

    it('should add a text with a question mark', function() {
      reasy.maybe('ab');
      expect( reasy.exp ).toEqual('ab?');
    });
  });

  describe('.group', function() {
    beforeEach(function () {
      reasy = new REasy();
    });

    it("should return object", function() {
      expect( reasy.group(function(regex) { regex.have('a') }) ).toEqual(reasy);
    });

    it('should add a text with a question mark', function() {
      reasy.group(function(regex) {
        regex.have('a');
      });
      expect( reasy.exp ).toEqual('(a)');
    });
  });

  describe(".excecute", function() {
    it('match abba', function() {
      reasy = new REasy('abba');
      reasy.startWith('a')
           .have('bb')
           .andHave('a');
      expect( reasy.execute() ).toContain("abba");
    });

    it('match abbac', function() {
      reasy = new REasy('abbac');
      reasy.startWith('a')
           .have('bb')
           .andHave('a')
           .endWith('c');
      expect( reasy.execute() ).toContain("abbac");
    });

  });

});
