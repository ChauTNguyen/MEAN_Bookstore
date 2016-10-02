var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  lastName: String,
  firstName: String,
  phoneNumber: { type: Number },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

mongoose.model('Customer', CustomerSchema);