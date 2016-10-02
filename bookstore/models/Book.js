var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  bookID: String,
  _title: String, // title is glitchy...
  mainAuthor: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  otherAuthors: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
  // publisher: String,
  // pubDate: { type: Number },
  // edition: { type: Number ,
  cost: { type: Number },
  retailPrice: { type: Number },
  hasBeenSold: Boolean
});

mongoose.model('Book', BookSchema);