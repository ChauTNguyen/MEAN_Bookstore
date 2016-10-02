var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

router.get('/employees', function (req, res, next) {
  Employee.find(function (err, employees) {
    if (err) {
      return next(err);
    }

    res.json(employees);
  });
});

router.post('/employees', function (req, res, next) {
  var employee = new Employee(req.body);

  employee.save(function (err, employee) {
    if (err) {
      return next(err);
    }

    res.json(employee);
  });
});

module.exports = router;