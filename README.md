# Fake database to mock REST API

## When do I need this?

Fake Database could be usefule for mocking REST API during development of an application. Check out [REST API for TodoMVC app](https://github.com/todomvc-js-course/backbone-express-commonjs/blob/master/server/index.js#L14-L36)

## Example

```js
var express = require('express');
var app = express();

var FakeDB = require('fake-db');
var db = new FakeDB([
    {title: 'foo'},
    {title: 'bar'}
]);

app.get('/api/todos', function(req, res) {
  db.getCollection().then(function(collection) {
    res.json(collection);
  });
});

app.listen(3000);
```

## API

All methods emulate async under the hood and return a promise.

### getCollection

```js
var collection = [
    {title: 'foo'},
    {title: 'bar'}
];
var db = new FakeDB(collection);

db.getCollection().then(function(collection) {
    // [{...}, {...}]
    console.log(collection);
});
```

### getItem

```js
var collection = [
    {title: 'foo'},
    {title: 'bar'}
];
var db = new FakeDB(collection);

db.getItem(1).then(function(item) {
    // {title: 'foo'}
    console.log(item);
});
```

### setItem

```js
var collection = [
    {title: 'foo'},
    {title: 'bar'}
];
var db = new FakeDB(collection);

db.setItem(3)
    .then(function() {
        return db.getCollection()
    })
    .then(function(collection) {
        // 3
        console.log(collection.length);
    });
```

> id could be ommited and will be set automatically

### removeItem

```js
var collection = [
    {title: 'foo'},
    {title: 'bar'}
];
var db = new FakeDB(collection);

db.removeItem(1)
    .then(function() {
        return db.getCollection()
    })
    .then(function(collection) {
        // 1
        console.log(collection.length);
    });
```
