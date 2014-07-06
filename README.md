Reasy JS
=====

Easy regex builder.

Examples
========

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

How to contribute
=====

Clone the repo and enjoy create some new stuff.
