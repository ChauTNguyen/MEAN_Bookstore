var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Customer = mongoose.model('Customer');

router.get('/customers', function (req, res, next) {
  Customer.find(function (err, customers) {
    if (err) { return next(err); }
    res.json(customers);
  });
});

router.post('/customers', function (req, res, next) {
  var customer = new Customer(req.body);

  customer.save(function (err, customer) {
    if (err) { return next(err); }
    res.json(customer);
  });
});

router.param('customer', function (req, res, next, id) {
  var query = Customer.findById(id).populate({
    path: 'orders',
    model: 'Order',
    populate: { // deep population
      path: 'booksOrdered',
      model: 'Book'
    }
  });

  query.exec(function (err, customer) {
    if (err) { return next(err); }
    if (!customer) { return next(new Error('can\t find customer')); }
    req.customer = customer;
    return next();
  });
});

router.get('/customers/:customer', function (req, res, next) {
  res.json(req.customer);
});

module.exports = router;