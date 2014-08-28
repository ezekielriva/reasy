Reasy JS
=====
[![Build Status](https://travis-ci.org/ezekielriva/reasy.svg?branch=master)](https://travis-ci.org/ezekielriva/reasy)
[![Code Climate](https://codeclimate.com/github/ezekielriva/reasy.png)](https://codeclimate.com/github/ezekielriva/reasy)

Easy regex builder.

Examples
========

Easy example
```javascript
//Instance Reasy
var reasy = new Reasy('aa');

reasy.have('a')
reasy.execute() //=> return [a]

reasy.getRegex() //=> return /a/

reasy.clearExp() // clean the expresion

reasy.have('b')
reasy.execute() //=> return null

```

Username
```javascript
reasy.startWith('[a-z0-9_-]', 3, 16).end();
reasy.setTestingString('ezekielriva').execute(); // ['ezekielriva']

reasy.setTestingString('th1s1s-wayt00_l0ngt0beausername').execute(); // null
```

Password
```javascript
reasy.startWith('[a-z0-9_-]',6,18).end();
reasy.setTestString('myp4ssw0rd').execute(); // ['myp4ssw0rd']

reasy.setTestString('mypa$$w0rd').execute(); // null
```

Hex Value
```javascript
reasy.startWith('#').group(function(){
  this.have('[a-f0-9]',6).orHave('[a-f0-9]',3);
}).end();
reasy.setTestString('#a3c113').execute(); // ["#a3c113", "a3c113"]

reasy.setTestString('#4d82h4').execute(); // null
```

Slug
```javascript
reasy.start().atLeastOne('[a-z0-9-]').end().execute(); // ["my-title-here"]

reasy.setTestString('my_title_here').execute(); // null
```

Email
```javascript
reasy.start().group(function(){
 this.atLeastOne('[a-z0-9_\.-]');
}).andHave('@').group(function(){
 this.atLeastOne('[\da-z-]');
}).andHave('\.').group(function(){
 this.have('[a-z\.]',2,6).end();
});

reasy.setTestString('john@doe.com').execute(); // ["john@doe.com", "john", "doe", "com"]

reasy.setTestString('john@doe.something').execute(); // null

```
How to contribute
=====

Clone the repo and enjoy create some new stuff.
