describe("Reasy", function() {
  var reasy;
  describe("constructor", function() {
    it('should initialize original string', function() {
      reasy = new Reasy('original');
      expect(reasy._testString).toEqual('original');
    });
  });

  describe(".startWith", function() {
    beforeEach(function() {
      reasy = new Reasy();
    });

    it("should add to exp the initial state of string matched", function() {
      reasy.startWith('b');
      expect(reasy.exp).toEqual('^(?:b)');
    });

    it("should return object", function() {
      expect(reasy.startWith('b')).toEqual(reasy);
    });
  });

  describe(".endWith/.andEndWith", function() {
    beforeEach(function() {
      reasy = new Reasy();
    });

    it("should add to exp the ending state of string matched", function() {
      reasy.endWith('b');
      expect(reasy.exp).toEqual('(?:b)$');
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
      reasy = new Reasy();
    });

    it("should add to matcher current value", function() {
      reasy.have('b');
      expect(reasy.exp).toEqual('(?:b)');
    });

    it("should return object", function() {
      expect( reasy.have('b') ).toEqual(reasy);
    });

    it("should add specific quantity matcher", function() {
      reasy.have('b', 1);
      expect( reasy.exp ).toEqual('(?:b){1}');
    });

    it("should add specific quantity matcher and limit of ocurrences", function() {
      reasy.have('b', 1, 2);
      expect( reasy.exp ).toEqual('(?:b){1,2}');
    });
  });

  describe(".atLeastOne", function() {
    beforeEach(function() {
      reasy = new Reasy();
    });

    it("should add a plus into exp if it has not arguments", function() {
      reasy.atLeastOne('b');
      expect( reasy.exp ).toEqual('(?:b)+');
    });

    it("should return object", function() {
      expect( reasy.atLeastOne('b') ).toEqual(reasy);
    });
  });

  describe(".any", function() {
    beforeEach(function() {
      reasy = new Reasy();
    });

    it("should add a asterisk into exp if it has not arguments", function() {
      reasy.any('b');
      expect( reasy.exp ).toEqual('(?:b)*');
    });

    it("should return object", function() {
      expect( reasy.any('b') ).toEqual(reasy);
    });
  });

  describe(".anything", function() {
    beforeEach(function() {
      reasy = new Reasy();
    });

    it("should add expression to search any character", function() {
      reasy.anything();
      expect( reasy.exp ).toEqual('(?:.)*');
    });

    it("should return object", function() {
      expect( reasy.anything() ).toEqual(reasy);
    });
  });

  describe('.maybe', function() {
    beforeEach(function () {
      reasy = new Reasy();
    });

    it("should return object", function() {
      expect( reasy.maybe('ab') ).toEqual(reasy);
    });

    it('should add a text with a question mark', function() {
      reasy.maybe('ab');
      expect( reasy.exp ).toEqual('(?:ab)?');
    });
  });

  describe('.group', function() {
    beforeEach(function () {
      reasy = new Reasy();
    });

    it("should return object", function() {
      expect( reasy.group(function() {
        this.have('a');
      }) ).toEqual(reasy);
    });

    it('should add a text with a question mark', function() {
      reasy.group(function() {
        this.have('a');
      });
      expect( reasy.exp ).toEqual('((?:a))');
    });
  });

  describe(".excecute", function() {
    it('match abba', function() {
      reasy = new Reasy('abba');
      reasy.startWith('a')
           .have('bb')
           .andHave('a');
      expect( reasy.execute() ).toContain("abba");
    });
  });

});
