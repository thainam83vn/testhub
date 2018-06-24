const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = Schema({
  _id: Schema.Types.ObjectId,
  question: Schema.Types.String,
  explanation: Schema.Types.String,
  answers: [{ answer: Schema.Types.String, correct: Schema.Types.Boolean }]
});
const model = mongoose.model("questions", QuestionSchema);
module.exports = model;
