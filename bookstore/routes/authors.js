var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Author = mongoose.model('Author');
var Book = mongoose.model('Book');

router.get('/authors', function (req, res, next) {
  Author.find(function (err, authors) {
    if (err) { return next(err); }
    res.json(authors);
  }).populate({
    path: 'books',
    Model: 'Book'
  });
});

router.post('/authors', function (req, res, next) {
  var author = new Author(req.body);

  author.save(function (err, author) {
    if (err) { return next(err); }
    res.json(author);
  });
});

router.param('author', function (req, res, next, id) {
  var query = Author.findById(id);

  query.exec(function (err, author) {
    if (err) { return next(err); }
    if (!author) { return next(new Error('can\t find author')); }
    req.author = author;
    return next();
  });
});

router.get('/authors/:author', function (req, res, next) {
  res.json(req.author);
});

router.put('/authors/:author', function (req, res, next) {
  Author.findOne({ _id: req.params.author }, function (err, doc) {
    doc.lastName = req.body.lastName;
    doc.firstName = req.body.firstName;
    doc.save();
  });

  res.json('successful edit');
});

module.exports = router;