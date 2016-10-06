var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  id: String,
  date: { type: Date },
  orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  soldBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  booksOrdered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  total: { type: Number }
});

mongoose.model('Order', OrderSchema);