var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Book = mongoose.model('Book');
var Employee = mongoose.model('Employee');
var Customer = mongoose.model('Customer');
var Order = mongoose.model('Order');

router.get('/orders', function (req, res, next) {
  Order.find(function (err, orders) {
    if (err) {
      return next(err);
    }

    res.json(orders);
  }).populate('orderedBy')
    .populate('soldBy')
    .populate({
      path: 'booksOrdered',
      Model: 'Book'
    });
});

router.post('/orders', function (req, res, next) {
  var order = new Order(req.body);

  order.save(function (err, order) {
    if (err) {
      return next(err);
    }

    Customer.findById(req.body.orderedBy, function (err, customer) {
      customer.orders.push(order);

      customer.save(function (err) {
        if (err) {
          console.log('Cannot save this customer.!');
        }
      });
    });

    Employee.findById(req.body.soldBy, function (err, employee) {
      employee.ordersCompleted.push(order);

      employee.save(function (err) {
        if (err) {
          console.log('Cannot save this employee!');
        }
      });
    });

    function updateBookStatus(err, book) {
      book.hasBeenSold = true;

      book.save(function (err) {
        if (err) {
          console.log('Cannot update status of book!');
        }
      });
    }

    for (var i = 0; i < req.body.booksOrdered.length; ++i) {
      Book.findById(req.body.booksOrdered[i], updateBookStatus);
    }

    res.json(order);
  });
});

module.exports = router;