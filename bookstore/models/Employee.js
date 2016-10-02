var mongoose = require('mongoose');

var EmployeeSchema = new mongoose.Schema({
  lastName: String,
  firstName: String,
  status: String, // I'm lazy so this will do for now.,
  ordersCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

mongoose.model('Employee', EmployeeSchema);