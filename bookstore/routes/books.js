var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var Author = mongoose.model('Author');

router.get('/books', function (req, res, next) {
  Book.find(function (err, books) {
    if (err) { return next(err); }
    res.json(books);
  }).populate('mainAuthor');
});

router.post('/books', function (req, res, next) {
  var book = new Book(req.body);

  book.save(function (err, book) {
    if (err) { return next(err); }

    Author.findById(req.body.mainAuthor, function (err, author) {
      author.books.push(book);

      author.save(function (err) {
        if (err) { console.log('Cannot save this author!'); }
      });
    });
    // TODO: FIX THIS POPULATE ISSUE
    console.log("wat" + book.mainAuthor);
    book.populate('mainAuthor', function (err) {
      console.log(book.mainAuthor);
      console.log(book.mainAuthor.lastName);
      console.log(book.mainAuthor.firstName);
    });

    // Book.populate(book, {path:'mainAuthor'}, function(err, book) {
    //   console.log(book.mainAuthor);
    // });

    res.json(book);
  });
});

router.param('book', function (req, res, next, id) {
  var query = Book.findById(id).populate('mainAuthor');

  query.exec(function (err, book) {
    if (err) { return next(err); }
    if (!book) { return next(new Error('can\t find book')); }
    req.book = book;
    return next();
  });
});

router.get('/books/:book', function (req, res, next) {
  res.json(req.book);
});

module.exports = router;