var mongoose = require('mongoose');

var AuthorSchema = new mongoose.Schema({
  lastName: String,
  firstName: String,
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

mongoose.model('Author', AuthorSchema);