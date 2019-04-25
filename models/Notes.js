var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var NotesSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  }
});
var Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;
